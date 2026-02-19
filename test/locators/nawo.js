export const submoduleoptions = (option) => [
    `//android.view.ViewGroup[@content-desc="${option}"]`,
    `//android.widget.TextView[@text="${option}"]/..`
];
