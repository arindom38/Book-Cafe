//all css are loaded after this js then main css then css import into main.css
// no css will affect  where filepond is applied
//so we need to manually import the stylesheets
const rootStyles = window.getComputedStyle(document.documentElement) //all root styles will be available
if(rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') != ''){ //when the property is not loaded
    ready() //call filepond plugin
}else{
    //if not loaded then load main-css by id and then call ready function
    document.getElementById('main-css').addEventListener('load',ready)
}

function ready(){
    //getting the values dynamically from root styles
    const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
    const coverAspectRatio =parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
    const coverHeight = coverWidth / coverAspectRatio
// Register the plugin
FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
)

FilePond.setOptions({
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight
})
FilePond.parse(document.body)
}
