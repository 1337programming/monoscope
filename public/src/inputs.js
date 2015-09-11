var inputs = module.exports = {};

inputs.binds = function (props) {
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
  }
  return inputs.createInputText(field);
};

inputs.createInputDropdown = function (field, isMultiple) {
  field.options = field.options || [];
  var props = {};
  props.size = field.options.length;
  if (isMultiple) {
    props.multiple = 'multiple';
  }
  var s = m('select', props,
    field.options.map(function (option) {
      var opts = {
        value: option.value
      };
      if (option.selected) {
        opts.selected = 'selected';
      }
      return m('option', opts, option.label);
    })
  );
  console.log(s);
  return s;
};

inputs.createInputText = function (field) {
  return m('input#' + field.id + '.row[type=text]', inputs.binds(field.value));
};
