// AerosimpleMobileReport.js
// FULL MOBILE REPORT CODE (HTML + CSS + PDF)
// Appium + WDIO + Allure → HTML report → PDF report
// Outputs:
// 1) Aerosimple_Mobile_App_Execution_Report.html
// 2) Aerosimple_Mobile_App_Execution_Report.pdf

import fs from "fs";
import path from "path";
import os from "os";
import { chromium } from "playwright";
import { exec } from "child_process";

/* ---------------- CONFIG ---------------- */
const RESULTS_DIR = "allure-results";               // Allure results folder
const HTML_FILE = "Aerosimple_Mobile_App_Execution_Report.html";
const PDF_FILE = "Aerosimple_Mobile_App_Execution_Report.pdf";
const EXPECTED_TESTS = Number(process.env.EXPECTED_TESTS) || 1;

const PLATFORM = "Android";
const DEVICE_NAME = process.env.DEVICE_NAME || "MyDevice";
const PLATFORM_VERSION = process.env.PLATFORM_VERSION || "13";
const APP_PACKAGE = "com.aerosimple.hybridapp";
const AUTOMATION = "UiAutomator2";

const AERO_LOGO_URL = "https://cdn.prod.website-files.com/60c30511fa90c3083ea9886a/60da05013080e80a49c5732e_AE%20Logo%20Main.svg";

/* ---------------- UTILITIES ---------------- */
function formatDuration(ms) {
    if (!ms) return "0s";
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m ? `${m}m ${s}s` : `${s}s`;
}

function escapeHtml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function extractError(data) {
    if (data?.statusDetails?.message) return data.statusDetails.message;
    return data?.message || "";
}

function failureType(msg = "") {
    const m = msg.toLowerCase();
    if (m.includes("timeout")) return "Timeout";
    if (m.includes("assert") || m.includes("expect")) return "Assertion";
    if (m.includes("permission")) return "Permission";
    return "Error";
}

function fixSuggestion(type) {
    switch (type) {
        case "Timeout": return "Increase waits, verify locator, check context (NATIVE / WEBVIEW).";
        case "Assertion": return "Validate expected vs actual app behavior.";
        case "Permission": return "Grant required permissions on device/emulator.";
        default: return "Check Appium server logs and device logcat.";
    }
}

/* ---------------- MAIN ---------------- */
async function generateMobileReport() {
    if (!fs.existsSync(RESULTS_DIR)) {
        console.log("❌ allure-results folder not found");
        return;
    }

    const files = fs.readdirSync(RESULTS_DIR).filter(f => f.endsWith(".json"));

    let passed = 0, failed = 0, skipped = 0;
    let totalDuration = 0;

    const tests = [];
    const failedTests = [];

    for (const file of files) {
        const data = JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, file), "utf8"));

        let status = (data.status || "unknown").toLowerCase();
        if (status === "broken") status = "failed";

        const duration = data.stop && data.start ? data.stop - data.start : 0;
        totalDuration += duration;

        const moduleName = data.labels?.find(l => l.name === "suite")?.value || "Mobile";
        const testName = data.name || file;

        if (status === "passed") passed++;
        else if (status === "skipped") skipped++;
        else failed++;

        tests.push({
            module: moduleName,
            name: testName,
            status,
            duration: formatDuration(duration)
        });

        if (status === "failed") {
            const err = extractError(data);
            const type = failureType(err);
            failedTests.push({
                module: moduleName,
                name: testName,
                type,
                duration: formatDuration(duration),
                message: err,
                fix: fixSuggestion(type)
            });
        }
    }

    const total = passed + failed + skipped;
    if (total < EXPECTED_TESTS) {
        console.log(`ℹ Only ${total} tests executed. Skipping report.`);
        return;
    }

    const overallStatus = failed > 0 ? "FAILED" : "PASSED";
    const executedBy = os.userInfo().username;
    const executedOn = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    /* ---------------- HTML + CSS ---------------- */
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Aerosimple Mobile Execution Report</title>
<style>
body { font-family: Arial, sans-serif; margin:40px; font-size:12px; }
.header { display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #ddd; padding-bottom:10px; }
.title { font-size:20px; font-weight:bold; }
.section { margin-top:25px; }
.section h3 { background:#3a61a8; color:#fff; padding:8px; }
table { width:100%; border-collapse:collapse; margin-top:10px; }
th, td { border:1px solid #ccc; padding:6px; text-align:left; }
th { background:#3a61a8; color:#fff; }
.passed { color:#28a745; font-weight:bold; }
.failed { color:#dc3545; font-weight:bold; }
.skipped { color:#6c757d; font-weight:bold; }
</style>
</head>
<body>

<div class="header">
  <img src="${AERO_LOGO_URL}" height="40" />
  <div class="title">Mobile Automation Execution Report<br>Status: ${overallStatus}</div>
</div>

<div class="section">
<h3>Execution Details</h3>
<table>
<tr><td>Platform</td><td>${PLATFORM} ${PLATFORM_VERSION}</td><td>Device</td><td>${DEVICE_NAME}</td></tr>
<tr><td>Automation</td><td>${AUTOMATION}</td><td>App Package</td><td>${APP_PACKAGE}</td></tr>
<tr><td>Executed By</td><td>${executedBy}</td><td>Executed On</td><td>${executedOn}</td></tr>
<tr><td>Total Tests</td><td>${total}</td><td>Total Duration</td><td>${formatDuration(totalDuration)}</td></tr>
</table>
</div>

<div class="section">
<h3>Test Results</h3>
<table>
<tr><th>#</th><th>Module</th><th>Test Name</th><th>Status</th><th>Duration</th></tr>
${tests.map((t, i) => `<tr>
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
<tr><th>#</th><th>Module</th><th>Test</th><th>Type</th><th>Fix Suggestion</th></tr>
${failedTests.map((f, i) => `<tr>
<td>${i + 1}</td>
<td>${escapeHtml(f.module)}</td>
<td>${escapeHtml(f.name)}</td>
<td class="failed">${f.type}</td>
<td>${escapeHtml(f.fix)}</td>
</tr>`).join("")}
</table>
</div>` : ""}

</body>
</html>`;

    /* ---------------- SAVE HTML ---------------- */
    fs.writeFileSync(HTML_FILE, html);
    console.log(`✅ HTML report generated: ${HTML_FILE}`);

    /* ---------------- HTML → PDF ---------------- */
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.pdf({ path: PDF_FILE, format: "A4", printBackground: true });
    await browser.close();

    console.log(`✅ PDF report generated: ${PDF_FILE}`);

    if (process.platform === "win32") {
        exec(`start "" "${PDF_FILE}"`);
    }
}

generateMobileReport().catch(err => {
    console.error("❌ Report generation failed", err);
    process.exit(1);
});
