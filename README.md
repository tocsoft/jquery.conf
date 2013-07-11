A simple javascript based confirmation dialog box


to wire in you call

`$(selector).confirmDialog();`


you can update the details options for all future confirm boxes by updating

`$.confirmDialog.defaultOptions;`

### messageAttribute 
the attribute read the message text from, and the setting used to "autowire".

### message
the fallback message if it can't be read from the attribute

### confirmButtonAttribute
th attribute used to read the value of the confirmation button

### confirmButtonText
the fallback text to use if ttribute is missing or empty

### cancelButtonAttribute
the attribute used to read the value of the confirmation button

### cancelButtonText
the fallback text to use if ttribute is missing or empty

Autowire
------------------------
You can autowire and watch dynamicly loaded node by using autowiring

`$.confirmDialog.autowire(messageAttributeString)` or `$.confirmDialog.autowire({ options:'here' })` or `$.confirmDialog.autowire()` leave it empty to use the defaults
