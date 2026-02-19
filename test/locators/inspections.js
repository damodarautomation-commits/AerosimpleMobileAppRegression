export const inspectionActionLocators = (action) => [
    `~${action}`,
    `android=new UiSelector().description("${action}")`,
    `android=new UiSelector().text("${action}")`,
    `//android.view.ViewGroup[@content-desc="${action}"]`,
    `//android.widget.TextView[@text="${action}"]`,
    `//android.widget.TextView[contains(@text,"${action}")]`
];

export const inspectionLocators = (Inspection_name) => [
    `~${Inspection_name}`,
    `android=new UiSelector().description("${Inspection_name}")`,
    `android=new UiSelector().text("${Inspection_name}")`,
    `//android.view.ViewGroup[@content-desc="${Inspection_name}"]`,
    `//android.view.ViewGroup[contains(@content-desc,"${Inspection_name}")]`,
    `//android.widget.TextView[@text="${Inspection_name}"]`,
    `//android.widget.TextView[contains(@text,"${Inspection_name}")]`
];

export const ShiftLocators = () => [
    "//android.view.ViewGroup[contains(@content-desc,'')]"
];

export const SelectShift = (shiftValue) => [
    `//android.view.ViewGroup[@resource-id="${shiftValue}"]`
];

export const StartInspection = () => [
    "//android.widget.Button[@content-desc='Start Inspection']",
    "//android.widget.TextView[@resource-id='fab-text']"
];

export const ChecklistFail = (index) => [
    `(//android.widget.TextView[@text="Checklist 1"]/../../..//android.widget.Button[@content-desc="Fail"])[${index}]`
];

export const CompleteInspection = () => [
    "//android.widget.Button[@content-desc='Complete Inspection']",
    "//android.widget.TextView[@resource-id='fab-text']/.."
];

export const validation_message = () => [
    '//android.view.View[@text=" Please add a remark or create a Work Order for all Unsatisfactory items"]'
];

export const OKbutton = () => [
    "//android.widget.Button[@content-desc='Ok']"
]

export const ChecklistActionButton = (index) => [
    `(//android.widget.TextView[@text=''])[${index}]`
]

export const ChecklistActionItem = (actionItem) => [
    `//android.widget.TextView[@text="${actionItem}"]/..`
];

export const Create = () => [
    "//android.widget.TextView[@text='Create']/.."
]

export const InputNameField = () => [

]