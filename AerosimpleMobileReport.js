// AerosimpleMobileReport.js
// Generates HTML + PDF Mobile Execution Report
// Node.js 18+, Playwright (ES module)

import fs from "fs";
import path from "path";
import os from "os";
import { chromium } from "playwright";
import { exec } from "child_process";

// ---------------- CONFIG ----------------
const RESULTS_DIR = "allure-results";
const HTML_FILE = "Aerosimple_Mobile_Execution_Report.html";
const PDF_FILE = "Aerosimple_Mobile_Execution_Report.pdf";

const PLATFORM = "Android";
const DEVICE_NAME = process.env.DEVICE_NAME || "MyDevice";
const PLATFORM_VERSION = process.env.PLATFORM_VERSION || "13";
const APP_PACKAGE = "com.aerosimple.hybridapp";
const AUTOMATION = "UiAutomator2";

const APP_VERSION = "48.5.1";
const ENV_VERSION = "16.8.7 staging";

const AERO_LOGO_URL =
    "https://cdn.prod.website-files.com/60c30511fa90c3083ea9886a/60da05013080e80a49c5732e_AE%20Logo%20Main.svg";

// ---------------- UTIL ----------------
const formatDuration = ms => {
    if (!ms) return "0s";
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return m ? `${m}m ${s % 60}s` : `${s}s`;
};

const escapeHtml = s =>
    String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const getLabel = (labels, name) => labels?.find(l => l.name === name)?.value;

// ---------------- MAIN ----------------
export async function generateMobileReport() {
    if (!fs.existsSync(RESULTS_DIR)) {
        console.log("❌ allure-results not found");
        return;
    }

    const files = fs.readdirSync(RESULTS_DIR).filter(f => f.endsWith(".json"));

    let passed = 0, failed = 0, skipped = 0;
    let totalDuration = 0;

    const tests = [];
    const failedTests = [];
    const seenTests = new Set();

    for (const file of files) {
        const filePath = path.join(RESULTS_DIR, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        let status = (data.status || "").toLowerCase();
        if (status === "broken") status = "failed";
        if (!["passed", "failed", "skipped"].includes(status)) continue;
        if (/^(before|after)/i.test(data.name)) continue;

        const duration = data.stop && data.start ? data.stop - data.start : 0;
        totalDuration += duration;

        const labels = data.labels || [];
        let rawModule = getLabel(labels, "suite") || getLabel(labels, "parentSuite");

        if (!rawModule || rawModule.trim() === "" || rawModule.trim() === data.name.trim()) {
            rawModule = path.basename(path.dirname(filePath)) || "Unknown";
        }

        const moduleName = rawModule;

        const uniqueKey = `${moduleName}||${data.name}`;
        if (seenTests.has(uniqueKey)) continue;
        seenTests.add(uniqueKey);

        if (status === "passed") passed++;
        else if (status === "skipped") skipped++;
        else failed++;

        tests.push({
            module: moduleName,
            name: data.name,
            status,
            duration: formatDuration(duration),
        });

        if (status === "failed") {
            failedTests.push({
                module: moduleName,
                name: data.name,
                type: "Error",
                fix: "Check Appium server logs and device logcat.",
            });
        }
    }

    const total = passed + failed + skipped;
    const passPct = total ? ((passed / total) * 100).toFixed(1) : 0;
    const failPct = total ? ((failed / total) * 100).toFixed(1) : 0;

    const moduleMap = {};
    for (const t of tests) {
        if (!moduleMap[t.module]) {
            moduleMap[t.module] = [];
        }
        moduleMap[t.module].push(t);
    }

    const orderedModules = Object.keys(moduleMap).sort();
    const orderedTests = [];

    for (const moduleName of orderedModules) {
        const moduleTests = moduleMap[moduleName];
        moduleTests.sort((a, b) => a.name.localeCompare(b.name));
        orderedTests.push(...moduleTests);
    }

    const overallStatus = failed > 0 ? "Failed" : "Passed";
    const overallStatusClass = failed > 0 ? "status-failed" : "status-passed";

    const executedBy = os.userInfo().username;
    const executedOn = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Aerosimple Mobile Execution Report</title>
<style>
@page { size: A4; margin: 10mm; }
body { font-family:"Roboto","Segoe UI",Arial,sans-serif; font-size:12px; color:#333; }
.header { display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #ddd; padding-bottom:10px; }
.title { font-family:"Segoe UI",Arial,sans-serif; font-size:18px; font-weight:bold; }
.status-passed { color:#1a7f37; font-weight:bold; }
.status-failed { color:#d1242f; font-weight:bold; }
.summary-bar { display:flex; margin-top:10px; gap:8px; }
.summary-bar div { flex:1; text-align:center; padding:6px; border-radius:6px; font-weight:bold; font-size:12px; }
.passed-bar { background:#d4edda; color:#155724; }
.failed-bar { background:#f8d7da; color:#721c24; }
.skipped-bar { background:#e2e3e5; color:#383d41; }
.total-bar { background:#cce5ff; color:#004085; }
.section { margin-top:20px; }
.section h3, th { font-family:"Segoe UI",Arial,sans-serif; background:#3a61a8; color:#fff; padding:8px; }
table { width:100%; border-collapse:collapse; }
td, th { border:1px solid #ccc; padding:6px; }
.passed { color:#1a7f37; font-weight:bold; }
.failed { color:#d1242f; font-weight:bold; }
.skipped { color:#6c757d; font-weight:bold; }
</style>
</head>
<body>

<div class="header">
<img src="${AERO_LOGO_URL}" height="36">
<div class="title">
Mobile Execution Report<br>
Status: <span class="${overallStatusClass}">${overallStatus}</span>
</div>
</div>

<div class="section">
<h3>Execution Details</h3>
<table>
<tr><td>Platform</td><td>${PLATFORM} ${PLATFORM_VERSION}</td><td>Device</td><td>${DEVICE_NAME}</td></tr>
<tr><td>Automation</td><td>${AUTOMATION}</td><td>App Package</td><td>${APP_PACKAGE}</td></tr>
<tr><td>Executed By</td><td>${executedBy}</td><td>Executed On</td><td>${executedOn}</td></tr>
<tr><td>Total Tests</td><td>${total}</td><td>Total Duration</td><td>${formatDuration(totalDuration)}</td></tr>
<tr><td>Pass </td><td>${passPct}%</td><td>Fail </td><td>${failPct}%</td></tr>
<tr><td>App Version</td><td>${APP_VERSION}</td><td>Environment Version</td><td>${ENV_VERSION}</td></tr>
</table>
</div><div class="summary-bar">
  <div class="passed-bar"><div>${passed}</div><div>Passed</div></div>
  <div class="failed-bar"><div>${failed}</div><div>Failed</div></div>
  <div class="skipped-bar"><div>${skipped}</div><div>Skipped</div></div>
  <div class="total-bar"><div>${total}</div><div>Total</div></div>
</div>

<div class="section">
<h3>Test Results (Module Wise)</h3>
<table>
<tr><th>S.No</th><th>Module</th><th>Test Name</th><th>Status</th><th>Duration</th></tr>
${orderedTests.map((t, i) => `
<tr>
<td>${i + 1}</td>
<td>${escapeHtml(t.module)}</td>
<td>${escapeHtml(t.name)}</td>
<td class="${t.status}">${t.status.toUpperCase()}</td>
<td>${t.duration}</td>
</tr>`).join("")}
</table>
</div>

${failedTests.length ? `
<div class="section">
<h3>Failed Tests Analysis</h3>
<table>
<tr><th>S.No</th><th>Module</th><th>Test</th><th>Type</th><th>Fix Suggestion</th></tr>
${failedTests.map((f, i) => `
<tr>
<td>${i + 1}</td>
<td>${escapeHtml(f.module)}</td>
<td>${escapeHtml(f.name)}</td>
<td class="failed">${f.type}</td>
<td>${f.fix}</td>
</tr>`).join("")}
</table>
</div>` : ""}

</body>
</html>
`;

    fs.writeFileSync(HTML_FILE, html);
    console.log("✅ HTML generated");

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "screen" });

    await page.pdf({
        path: PDF_FILE,
        format: "A4",
        printBackground: true,
        margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
        scale: 1
    });

    await browser.close();
    console.log("✅ PDF generated at", PDF_FILE);

    if (process.platform === "win32") {
        exec(`start "" "${PDF_FILE}"`);
    }
}

(async () => {
    try {
        await generateMobileReport();
    } catch (err) {
        console.error(err);
    }
})();

