[![Code Climate](https://codeclimate.com/github/1337programming/monoscope.svg)](https://codeclimate.com/github/1337programming/monoscope)
[![GitHub version](https://badge.fury.io/gh/1337programming%2Fmonoscope.svg)](http://badge.fury.io/gh/1337programming/monoscope)
[![Dependency Status](https://david-dm.org/1337-programming/monoscope.svg)](https://david-dm.org/1337programming/monoscope)
[![Issue Stats](http://issuestats.com/github/1337programming/monoscope/badge/pr)](http://issuestats.com/github/1337programming/monoscope)
[![Issue Stats](http://issuestats.com/github/1337programming/monoscope/badge/issue)](http://issuestats.com/github/1337programming/monoscope)
#Monoscope

Create shortcuts in Node.js for while developing your modern web application locally.

![alt tag](https://raw.githubusercontent.com/1337programming/monoscope/master/logo-banner.png)

## Install & Run
 * Run `npm install`
 * Require the monoscope item in your automation development task.
 * Write `monoscope.run(shortcuts, options)` within your automation development task. Shortcuts and options are to be setup as defined below.
 
## Shortcuts
Shortcuts should be an array containing objects, similar to the following:

## Form Items
Form is an optional property that will create a modal with the form items to ask prior to running the action. Form items include the following.

### Text Field
Text fields should be in the form:

```javascript
var text = {
  label: 'Text Example', //Text to show
  prop: 'testExampleVariableName'
  type: 'text',
  default: 'My Text'//or omitted
};
```

### Checkbox
Checkboxes should be in the form:

```javascript
var checkbox = {
  label: 'Checkbox', //Text to show
  prop: 'checkboxVariableName',
  type: 'checkbox',
  default: true //or false
};
```
### Select
Selects should be in the form:

```javascript
var select = {
  label: 'Select', //Text to show
  prop: 'selectVariableName',
  type: 'select',
  options: [
    label: 'Example Option',
    value: 'Example Option Value',
    selected: 'selected' //Or omitted, only one
  ]
};
```

### Multiselect
Multiselects should be in the form:

```javascript
var multiselect = {
 label: 'Multiselect', //Text to show
 prop: 'multiselectVariableName',
 type: 'multiselect',
 options: [{
   label: 'Example Option',
   value: 'Example Option Value',
   selected: 'selected' //Or omitted
 }]
};
```
## Options
Options include:
 - title: The title of the Monoscope application. Default value of 'Monoscope'
 - appPort: The port of the local application being shown. Default value is 9000.
 
## Cheers
![PandaBear](https://s3.amazonaws.com/uploads.hipchat.com/69515/932142/DL97c184IFoG2su/PandaBear.png)

 
# License
  [MIT](/LICENSE)
