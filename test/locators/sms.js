export const submodules = (option) => `//android.widget.TextView[@text="${option}"]/..`

export const reporthazard = () => '//android.widget.TextView[@text="Report Safety Hazard"]/..'

export const apps = () => '//android.view.ViewGroup[contains(@content-desc,"Apps")]'

export const anonymous = () => '//android.widget.TextView[@text=" I want to remain anonymous."]/..'

export const reportSafetyHazard = () => '//android.widget.TextView[@text="Report Safety Hazard"]'

export const next = () => '//android.view.ViewGroup[@content-desc="Next Step"]'

export const title = () => '(//android.widget.TextView[@text="Title"]//following-sibling::android.widget.EditText)[1]'

export const category = () => '(//android.widget.TextView[@text="* Category"]//following-sibling::android.view.ViewGroup)[1]'

export const categoryoption = (option) => `//android.widget.TextView[@text="${option}"]/..`

export const priority = () => '(//android.widget.TextView[@text="* Priority"]//following-sibling::android.view.ViewGroup)[1]'

export const priorityoption = () => '//android.widget.TextView[@text="* Priority"]'

export const description = () => '(//android.widget.TextView[@text="* Description of Hazard"]//following-sibling::android.widget.EditText)[1]'

export const locationmap = () => '//android.view.TextureView[contains(@content-desc,"Map")]'

export const submit = () => '//android.widget.TextView[@text="Submit"]/..'

export const fullmap = () => '//android.view.TextureView[@content-desc="Google Map"]'

export const polygon = () => '(//android.widget.ImageView[1]/parent::android.view.ViewGroup)[1]'

export const savepolygon = () => '//android.widget.TextView[@text="Finish"]/../..'

export const done = () => '//android.widget.TextView[@text="Done"]/..'

export const photos = () => '(//android.widget.TextView[@text="Photos"]//following-sibling::android.view.ViewGroup)[1]'

export const attachmentfromgallery = () => '//android.widget.TextView[@text="GALLERY"]/..'

export const phototaken = () => '//android.view.View[contains(@content-desc,"Photo taken")]'

export const country = () => '//android.widget.TextView[@text="🇺🇸"]'

export const selectIndia = () => '//android.widget.TextView[@text="India"]/..'

export const enterphonenumber = () => '//android.widget.EditText[@text="_____ _____"]'

export const hazardentries = () => '(//android.widget.TextView[contains(@text,"New Safety Hazard")])/..'

export const activity = () => '//android.view.ViewGroup[@content-desc="Activity"]'

export const comments = () => '//android.widget.TextView[contains(normalize-space(@text),"Comments")]/..'

export const addComment = () => '//android.widget.TextView[@text="Add Comment"]/..'

export const entercomment = () => '//android.widget.TextView[@text="New Comment"]/ancestor::android.view.ViewGroup[1]//android.widget.EditText'

export const attachfile = () => '//android.widget.TextView[@text="Attach a file"]'


export const save = () => '//android.widget.TextView[@text="Save"]/..'

export const selectCategory = () => '//android.widget.TextView[@text="Please select category"]/..'

export const chosecategory = () => '//android.widget.TextView[@text="Environmental"]/..'

export const back = () => '//android.widget.TextView[@text="Back"]'

export const History = () => '//android.widget.TextView[@text=" History"]/..'

export const stages = () => '//android.view.ViewGroup[@content-desc="Stages"]'

export const systemDescription = () => '//android.widget.TextView[@text="Submit System Description"]/..'

export const describesystemfield = (index) => `(//android.widget.TextView[@text="Root Cause"]/following-sibling::android.view.ViewGroup//android.widget.EditText)[${index}]`

export const reviewComment = () => '(//android.widget.TextView[@text="Review Comment"]/following-sibling::android.view.ViewGroup//android.widget.EditText)'

export const assignedto = () => '//android.view.ViewGroup[contains(@content-desc,"System Admin")]'

export const riskassessment = () => '//android.widget.TextView[@text="Submit for Risk Assessment"]/..'

export const selectRisk = (risk) => `//android.widget.TextView[@text="${risk}"]/..`

export const comment = () => '(//android.widget.TextView[@text="Comment"]/following-sibling::android.view.ViewGroup//android.widget.EditText)'

export const Save = () => '//android.widget.TextView[@text="Save"]/..'

export const riskacceptance = () => '//android.widget.TextView[@text="Submit for Risk Acceptance "]/..'

export const selectoptiondropdown = () => '(//android.widget.TextView[@text="Please select an option"]//following-sibling::android.view.ViewGroup)[1]'

export const mitigation = () => '//android.widget.TextView[@text="Comment"]'

export const closehazard = () => '//android.widget.TextView[@text="Close Safety Hazard"]/..'

export const roleuser = () => '//android.widget.TextView[@text="Role or Person"]/..'

export const relatedHazard = () => '//android.widget.TextView[@text="Related Hazards"]'

export const addrelatedhazard = () => '//android.widget.TextView[@text="Add Related Hazard"]'

export const listofhazards = () => '(//android.widget.TextView[contains(@text, "HAZARD ID")])[1]'

export const correctiveaction = () =>
    '//android.widget.TextView[@text="Corrective Actions"]/..';

export const horizontalswipe = () =>
    '//android.widget.HorizontalScrollView';

export const newcorrectiveaction = () => '//android.widget.TextView[@text="New Corrective Actions"]/..'

export const duedate = () => '(//android.widget.TextView[@text="Due Date"]/following-sibling::android.view.ViewGroup)[1]'

export const reportedDate = () => '//android.widget.TextView[@resource-id="undefined.header.title"]'

export const currentMonthAndYear = (day, current_text) =>
    `//android.widget.Button[contains(@content-desc,"${day} ${current_text}")]`

export const riskmatrix = () => '//android.widget.TextView[@text="Select Residual Risk from Matrix"]'

export const workordertab = () => '//android.widget.TextView[@text="Work Orders"]/..'

export const createworkorder = () => '//android.widget.TextView[@text="Create Work Order"]/..'

export const nonairfield = () => '//android.widget.TextView[@text=" Create Non-Airfield Work Orders"]/..'

export const controllers = () => '//android.widget.TextView[@text="Controls"]/..'

export const existingcontrollers = () => '//android.widget.TextView[@text="Add Existing Controls"]'

export const controller_name = (name) => `//android.view.ViewGroup[@content-desc="${name}"]`