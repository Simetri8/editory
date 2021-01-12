
/// xxx(204) /*ImageServiceProp*/

var ImageServiceProp = new class {
    setService(e) {
        this.uploadService = e
    }
    getService() {
        return this.uploadService
    }
}

export default ImageServiceProp