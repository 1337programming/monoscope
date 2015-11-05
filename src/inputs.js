var inputs = module.exports = {};
var m = require('mithril');
inputs.binds = function (prop) {
  return {
    oninput: m.withAttr("value", prop),
    value: prop()
  };
};

inputs.createInput = function (field) {
  if (field.type === 'select') {
    return inputs.createInputDropdown(field);
  } else if (field.type === 'multiselect') {
    return inputs.createInputDropdown(field, true);
  } else if (field.type === 'checkbox') {
    return inputs.createInputCheckbox(field);
  }
  return inputs.createInputText(field);
};

inputs.createInputDropdown = function (field, isMultiple) {
  field.options = field.options || [];
  
  //Setup inital Values
  if (!field.initialized) {
    field.initialized = true;  

    var initialSelectedOptions = [];
    field.options.forEach(function(option) {
      if (option.selected) {
        initialSelectedOptions.push(option.value);
      }
    });
    if (isMultiple) {
      field.values = initialSelectedOptions;
    }
    else if (initialSelectedOptions.length > 0) {
      field.value = initialSelectedOptions[0]
    }

  }
    
  var props = {};
  if (isMultiple) {
    if (!Array.isArray(field.value())) {
      field.value = m.prop([field.value()]);  
    }
    props.multiple = 'multiple';
  }
  props.size = field.options.length;
  var s = m('select.form-control', props,
    field.options.map(function (option) {
      var opts = {
        value: option.value,
        onclick: function(e) {
          var selectedOptions = [];
          for (var i = 0; i < field.options.length; i++) {
            var element = e.srcElement.parentElement[i];
            if (element.selected) {
              selectedOptions.push(element.value);
            }
          }
          if (isMultiple) {
            field.values = selectedOptions;
          }
          else if (selectedOptions.length > 0) {
            field.value = selectedOptions[0];
          }
        }
      };
      if (option.selected) {
        opts.selected = 'selected';
      }
      return m('option', opts, option.label);
    })
  );
  return s;
};

inputs.createInputText = function (field) {
  return m('input#' + field.id + '.form-control[type=text]', inputs.binds(field.value));
};

inputs.createInputCheckbox = function (field) {
  if (field.value() !== true && field.value() !== false) {
    field.value(false);
  }

  return m('input#' + field.id + '.form-control[type=checkbox]', {onclick: m.withAttr("checked", field.value), checked: field.value()});
};