export const creatnew = () => [
    '//android.widget.Button[@resource-id="animated-fab"]',
    '//android.view.ViewGroup[@resource-id="animated-fab-container"]',
    '//android.widget.TextView[@text="󰐕"]'
];

export const ClickOnFormName = (formname) => [
    `//android.view.ViewGroup[contains(@content-desc, "${formname}")]`,
    `//android.view.ViewGroup[@content-desc="${formname} "]`,
    `~${formname}`,
];

export const FormOption = (option) => [
    `//android.widget.TextView[@text="${option}"]`,
    `~${option}`,
    `//android.view.ViewGroup[@content-desc="${option}"]`

];

export const InputTextField = (field) => [
    `//android.widget.TextView[@text="${field}"]/following-sibling::android.widget.EditText[1]`
];

export const CheckBox = (field) => [
    `//android.widget.TextView[@text="${field} "]/preceding-sibling::android.view.ViewGroup`
];

export const Date = (field) => [
    `(//android.widget.TextView[@text="${field}"]/following-sibling::android.view.ViewGroup)[1]`
];

export const yearbutton = () => [
    '//android.widget.TextView[@resource-id="android:id/date_picker_header_year"]'
];

export const selectyear = (option) => [
    `//android.widget.TextView[@resource-id="android:id/text1" and @text="${option}"]`
];

export const fulldate = (day) => [
    `//android.view.View[@content-desc="${day}"]`
];

export const okButton = () => [
    '//android.widget.Button[@resource-id="android:id/button1"]'
];

export const mcgSelectionField = () => [
    '//android.view.ViewGroup[@content-desc="Select item"]/..',
    '//android.widget.TextView[@text="Select item"]/parent::android.view.ViewGroup',
    '//android.widget.TextView[@text="Select item"]'
];

export const selectOption = (option) => [
    `//android.view.ViewGroup[@content-desc="${option}"]/android.view.ViewGroup`,
    `//android.widget.TextView[@text="${option}"]/../..`

];

export const attachment = () => [
    '//android.widget.TextView[@text="Add attachment"]/..',
    '//android.view.ViewGroup[@content-desc=", Add attachment"]',

];

export const attachmentField = () => [
    '//android.widget.TextView[@text="Attachments Field "]'
]

export const attachmentOptions = (option) => [
    `//android.widget.TextView[@text="${option}"]/..`,
    `//android.view.ViewGroup[@content-desc=", ${option}"]`
];

export const selectPhoto = () => [
    '//android.view.View[contains(@content-desc,"Photo taken")]'
];

export const DoneButton = () => [
    '//android.widget.TextView[@text="Done"]/..'
];

export const mcgSystemUserField = () => [
    '(//android.widget.TextView[@text="System User Field "]/following-sibling::android.view.ViewGroup)[1]'
];

export const selectSystemUser = (option) => [
    `//android.view.ViewGroup[@content-desc="${option}"]`
];

export const clickOnSave = () => [
    '//android.widget.Button[@content-desc="Save"]'
];

export const clickOnDataSource = (field) => [
    `//android.widget.TextView[@text="${field}"]/following-sibling::android.view.ViewGroup[1]`
];

export const selectOptionFromDataSource = (option) => [
    `//android.widget.TextView[@text="${option}"]/..
`
];

export const notam = (index) =>
    `(//android.view.ViewGroup[.//android.widget.TextView])[${index}]`;


export const submitForm = () => [
    '//android.widget.Button[@content-desc="Submit form"]'
]

export const companyname = () => [
    '//android.widget.TextView[@text="Company Name (Tenants) "]'
]

























































































































// --------------------------------------------

export const multicolumngrid = () => [
    '//android.widget.TextView[@text="Multi column grid"]/..',
    '//android.view.ViewGroup[@content-desc="Multi column grid, "]'
]
