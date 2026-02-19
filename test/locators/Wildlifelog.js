export const creatnew = () => [
    '//android.widget.Button[@resource-id="animated-fab"]',
    '//android.view.ViewGroup[@resource-id="animated-fab-container"]',
    '//android.widget.TextView[@text="󰐕"]'
];

export const selectwildlifemodules = (subModule) => [
    `//android.view.ViewGroup[contains(@content-desc, "${subModule}")]`,
    `//android.view.ViewGroup[@content-desc="${subModule} "]`,
    `~${subModule}`,
];

export const wildlifeoptions = (option) => [
    `//android.view.ViewGroup[@content-desc="${option}"]`,
    `//android.widget.TextView[@text="${option}"]/..
`];
export const activityreport = () => '//android.widget.TextView[@text="Wildlife Patrol & Activity Report"]'

export const incidentDateAndTime = () => '//android.view.ViewGroup[contains(@content-desc,":")]'

export const reportedDate = () => '//android.widget.TextView[@resource-id="undefined.header.title"]'

export const currentMonthAndYear = (day, current_text) =>
    `//android.widget.Button[contains(@content-desc,"${day} ${current_text}")]`

export const Done = () => '//android.widget.TextView[@text="Done"]'

export const map = () => '//android.view.TextureView[@content-desc="Google Map"]'

export const mapOption = (index) => `(//android.widget.ImageView[1]/parent::android.view.ViewGroup)[${index}]`

export const save = () => ['//android.widget.TextView[@text="Save"]/../..'];

export const fullmap = () => '//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup'

export const activity = (fieldName) => `//android.widget.TextView[@text="${fieldName}"]`

export const activityDropdown = () => '//android.view.ViewGroup[@content-desc="Please Select activity"]'

export const activityOption = (option) => `//android.widget.TextView[@text="${option}"]`

export const enterDescription = () => '//android.widget.EditText[@text="Enter description here"]'

export const submit = () => '//android.widget.TextView[@text="Submit"]/..'

export const wildlifetype = () => '//android.widget.TextView[@text="Please Select Wildlife Type"]'

export const wildlifeSelectionType = () => '(//android.widget.TextView[@text="* 0"])[3]'

export const wildlifespecies = () => '//android.view.ViewGroup[@content-desc="Please Select species"]'

export const selectSpecies = (option) => `//android.view.ViewGroup[@content-desc="${option}"]`

export const killedandspotted = (option) => `(//android.widget.TextView[@text="${option}"]/../following-sibling::android.widget.EditText)[1]`

export const add = () => '//android.widget.TextView[@text="Add"]/..'

export const wildlifeentry = () => [
    '(//android.view.ViewGroup[contains(@content-desc,"Type")])[1]'
];

export const wildlifeLogDetails = () => '//android.widget.TextView[@text="Wildlife Log Details"]'

export const wildlifeactionbutton = () => '//android.widget.TextView[@text=""]'

export const edit = () => '//android.widget.TextView[@text="Edit"]/..'

export const descriptionedit = () => '(//android.widget.TextView[normalize-space(@text)="Description"]/..//following-sibling::android.widget.EditText)[3]';

export const update = () => '//android.widget.TextView[@text="Update"]/..';

export const filter = () => '//android.widget.TextView[@text=" Last 30 days"]/..'

export const dateFilter = () => '//android.widget.TextView[@text="Date "]/..'

export const choseDateRange = (option) => `//android.widget.TextView[@text="${option}"]/..`

export const updateButton = () => '//android.widget.TextView[@text="Update"]'


