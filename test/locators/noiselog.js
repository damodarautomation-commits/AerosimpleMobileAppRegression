export const submoduleoptions = (option) => [
    `//android.view.ViewGroup[@content-desc="${option}"]`,
    `//android.widget.TextView[@text="${option}"]/..`
];

export const residentname = () =>
    '//android.widget.TextView[@text="Resident Name"]/following-sibling::android.widget.EditText[1]';

export const confirmtext = () =>
    '//android.widget.TextView[@text="Create Noise Log"]';

export const incidentReportDate = () =>
    '(//android.view.ViewGroup[contains(@content-desc,":")])[2]';

export const reportedDate = () =>
    '//android.widget.TextView[@resource-id="undefined.header.title"]';

export const currentMonthAndYear = (day, current_text) =>
    `//android.widget.Button[contains(@content-desc,"${day} ${current_text}")]`;

export const Done = () =>
    '//android.widget.TextView[@text="Done"] | //android.widget.Button[@text="Done"]';

export const map = () =>
    '//android.view.TextureView[contains(@content-desc,"Map")]';

export const fullmap = () =>
    '//android.view.TextureView[contains(@content-desc,"Map")]';

export const save = () =>
    '//android.view.ViewGroup[@content-desc="Save"]/..';

export const selectionDropDown = (field) =>
    `//android.widget.TextView[@text="${field}"]/following-sibling::android.view.ViewGroup[@content-desc][1]`;

export const selectOptionDropDown = (option) =>
    `//android.widget.TextView[@text="${option}"]`;

export const submit = () => '//android.view.ViewGroup[@content-desc="Submit"]'

export const noiseentry = () => '(//android.widget.TextView[@text="LOGGED BY : "]/..)[1]'

export const creatnew = () => [
    '//android.widget.Button[@resource-id="animated-fab"]',
    '//android.view.ViewGroup[@resource-id="animated-fab-container"]',
    '//android.widget.TextView[@text="󰐕"]'
];

export const edit = () => '//android.widget.TextView[@text=""]'

export const update = () => '//android.widget.TextView[@text="Update"]/..'