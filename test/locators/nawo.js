// ---------------- SUB MODULE ----------------
export const submoduleoptions = (option) => [
    `//android.view.ViewGroup[@content-desc="${option}"]`,
    `//android.widget.TextView[@text="${option}"]/..`
];

export const creatnew = () => [
    '//android.widget.Button[@resource-id="animated-fab"]',
    '//android.view.ViewGroup[@resource-id="animated-fab-container"]',
    '//android.widget.TextView[@text="󰐕"]'
];

// ---------------- DATE & TIME ----------------
export const date = () =>
    '(//android.widget.TextView[@text="Reported Date "]/following-sibling::android.view.ViewGroup)[1]';

export const time = () =>
    '(//android.widget.TextView[@text="Reported Date "]/following-sibling::android.view.ViewGroup)[2]';

// ---------------- PRIORITY ----------------
export const priority = () =>
    '(//android.widget.TextView[@text="Priority "]/following-sibling::android.view.ViewGroup)[1]';

export const priorityOption = (option) =>
    `//android.widget.TextView[@text="${option}"]/..`;

// ---------------- CATEGORY ----------------
export const category = () =>
    '(//android.widget.TextView[@text="Category"]/following-sibling::android.view.ViewGroup)[1]';

export const categoryOption = (option) =>
    `//android.view.ViewGroup[@content-desc="${option}"]`;

// ---------------- LOCATION ----------------
export const location = () =>
    '(//android.widget.TextView[@text="Location"]/following-sibling::android.view.ViewGroup)[1]';

export const locationOption = (option) =>
    `//android.widget.TextView[@text="${option}"]/..`;

// ---------------- DESCRIPTION ----------------
export const enterdescription = () =>
    '//android.widget.EditText[@text="Enter description here"]';

// ---------------- ATTACHMENT ----------------
export const attachment = () =>
    '//android.widget.TextView[@text="Add attachment"]/..';

export const galleryOption = () =>
    '~, Select From Gallery';

export const latestPhoto = () =>
    '//android.view.View[contains(@content-desc,"Photo taken")]';

export const doneButton = () =>
    '//android.widget.TextView[@text="Done"]/..';

// ---------------- COMPANY ----------------
export const companyname = () =>
    '(//android.widget.TextView[@text="Company Name "]/following-sibling::android.view.ViewGroup)[1]';

export const companynameOption = (option) =>
    `//android.view.ViewGroup[@content-desc="${option}"]`;

// ---------------- CREATE ----------------
export const create = () =>
    '//android.widget.Button[@content-desc="Create"]';

// ---------------- FORM FIELDS ----------------
export const name = () =>
    '(//android.widget.TextView[@text="Name "]//following-sibling::android.widget.EditText)[1]';

export const number = () =>
    '(//android.widget.TextView[@text="Number "]//following-sibling::android.widget.EditText)[1]';

export const checkbox = () =>
    '//android.widget.TextView[normalize-space(@text)="Check box"]/preceding-sibling::android.view.ViewGroup[last()]';

export const selection = () =>
    '(//android.widget.TextView[@text="Selection "]//following-sibling::android.view.ViewGroup)[1]';

export const selectionOption = (option) =>
    `//android.view.ViewGroup[@content-desc="${option}"]`;

export const systemuser = () =>
    '(//android.widget.TextView[@text="System User "]//following-sibling::android.view.ViewGroup)[1]';

export const systemuserOption = (option) =>
    `//android.view.ViewGroup[@content-desc="${option}"]`;

export const property = () =>
    '(//android.widget.TextView[@text="Properties "]/following-sibling::android.view.ViewGroup)[1]';

export const propertyOption = (option) =>
    `//android.widget.TextView[@text="${option}"]/..`;

export const assetregistry = () =>
    '(//android.widget.TextView[@text="Asset Registry "]/following-sibling::android.view.ViewGroup)[1]';

export const assetregistryOption = (option) =>
    `//android.widget.TextView[@text="${option}"]/..`;

export const tenants = () =>
    '(//android.widget.TextView[@text="Tenants "]/following-sibling::android.view.ViewGroup)[1]';

export const tenantsOption = (option) =>
    `//android.widget.TextView[@text="${option}"]/..`;

export const wildlifetype = () =>
    '(//android.widget.TextView[@text="Wildlife Type"]/following-sibling::android.view.ViewGroup)[1]';

export const wildlifetypeOption = (option) =>
    `//android.widget.TextView[@text="${option}"]/..`;

export const wildlifespecies = () =>
    '(//android.widget.TextView[@text="Wildlife Species"]/following-sibling::android.view.ViewGroup)[1]';

export const wildlifespeciesOption = (option) =>
    `//android.widget.TextView[@text="${option}"]/..`;

export const notam = () => '(//android.widget.TextView[@text="NOTAMS "]/following-sibling::android.view.ViewGroup)[1]'

export const notamOption = () => '(//android.view.ViewGroup[.//android.widget.TextView])[9]'


export const formdata = () => '(//android.widget.TextView[@text="Form Data "]/following-sibling::android.view.ViewGroup)[1]'

export const formdataOption = (option) => `//android.widget.TextView[@text="${option}"]/..`

export const datetime = () =>
    '(//android.widget.TextView[@text="Date Time "]/following-sibling::android.view.ViewGroup)[1]';

export const yearHeader = () =>
    '//android.widget.TextView[@resource-id="android:id/date_picker_header_year"]';

export const yearOption = (year) =>
    `//android.widget.TextView[@resource-id="android:id/text1" and @text="${year}"]`;

export const dayElement = (day, month, year) =>
    `//android.view.View[@content-desc="${day} ${month} ${year}"]`;

export const okButton = () =>
    '//android.widget.Button[@resource-id="android:id/button1"]';

export const timeField = (label) =>
    `(//android.widget.TextView[@text="${label}"]/following-sibling::android.view.ViewGroup)[1]`;

export const hourPicker = () =>
    '(//android.widget.NumberPicker)[1]//android.widget.EditText';

export const minutePicker = () =>
    '(//android.widget.NumberPicker)[2]//android.widget.EditText';

export const meridianPicker = () =>
    '(//android.widget.NumberPicker)[3]//android.widget.EditText';

export const actions = () => '//android.widget.TextView[@text="Actions"'

export const maintenancereview = () => '//android.widget.TextView[@text="Maintenance Review"]'

export const mrdes = () => '//android.widget.EditText[@text="Enter description here"]'

export const entries = () => '(//android.widget.TextView[@text="New"])/../..[1]'

export const resolve = () => '//android.widget.Button[@content-desc="Resolve"]'

export const multicolumngrid = () => '//android.widget.TextView[@text="* Multi Column Grid"]/..'

export const save = () => '//android.widget.Button[@content-desc="Save"]'

