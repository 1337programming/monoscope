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
          field.values = selectedOptions;
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