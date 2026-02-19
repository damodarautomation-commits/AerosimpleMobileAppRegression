export const creatnew = () => [
    '//android.widget.Button[@resource-id="animated-fab"]',
    '//android.view.ViewGroup[@resource-id="animated-fab-container"]'
];

export const submoduleoptions = (option) => [
    `//android.view.ViewGroup[@content-desc="${option}"]`,
    `//android.widget.TextView[@text="${option}"]/..`
];

export const fodentry = () =>
    '(//android.widget.TextView[@text="Reported by"])[1]/..'


export const header = () =>
    '//android.widget.TextView[@text="New FOD Log"]'


export const reportDateAndTime = () =>
    '//android.view.ViewGroup[contains(@content-desc,":")]'


export const reportedDate = () =>
    '//android.widget.TextView[@resource-id="undefined.header.title"]'


export const currentMonthAndYear = (day, current_text) =>
    `//android.widget.Button[contains(@content-desc,"${day} ${current_text}")]`


export const Done = () =>
    '//android.widget.TextView[@text="Done"]'


export const locationArea = () =>
    '//android.widget.TextView[@text="* Location Area"]'

export const locationAreaDropdown = () =>
    '//android.widget.TextView[@text="Please select Location Area"]/..'

export const locationareaOption = (option) =>
    `//android.view.ViewGroup[@content-desc="${option}"]`

export const map = () =>
    '//android.view.TextureView[@content-desc="Google Map"]'


export const mapOption = (index) =>
    `(//android.widget.ImageView[1]/parent::android.view.ViewGroup)[${index}]`


export const fullmap = () =>
    '//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup'


export const save = () =>
    '//android.view.ViewGroup[@content-desc="Save"]/..'


export const NextStop = () =>
    '//android.widget.TextView[@text="Next Step"]/..'

export const detect = () =>
    '//android.widget.TextView[@text="Please select Detected During"]'


export const selectdetectOption = () =>
    '//android.widget.TextView[@text="* Category"]'


export const category = () =>
    '//android.widget.TextView[@text="Please select category"]'


export const categoryOption = (option) =>
    `//android.widget.TextView[@text="${option}"]`


export const enterDescription = () =>
    '//android.widget.EditText[@text="Enter description here"]'


export const submit = () =>
    '//android.widget.TextView[@text="Submit"]/..'


export const edit = () => '//android.widget.TextView[@text=""]'

export const editconform = () => '//android.widget.TextView[@text="Edit FOD Log"]'

export const editcategory = () => '//android.widget.TextView[@text="* Category"]/following-sibling::android.view.ViewGroup[1]'

export const update = () => '//android.widget.TextView[@text="Update"]'

export const filter = () => '//android.widget.TextView[@text="󰘮"]'