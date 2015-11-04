var monoscope = require('../monoscope');
monoscope.run(getShortcuts(), {
    title: 'Components Example',
    color: 'blue'
});

function getShortcuts() {
    return [
    {
        name: 'Create a Module',
        form: [
        {
            label: 'Module Name',
            prop: 'moduleName',
            type: 'text',
            default: 'newModule'
        },
        {
            label: 'Include a Directive?',
            prop: 'includeDirective',
            type: 'checkbox'
        }],
        action: function(data) {
            console.log('Create a Module data', data);
        }
    },
    {
        name: 'Create a Service',
        form: [
        {
            label: 'Service Name',
            prop: 'serviceName',
            type: 'text',
            default: 'myService'
        },
        {
            label: 'Select Test',
            prop: 'selectTest',
            type: 'select',
            options: [
            {
                label: 'Label 1',
                value: 'label1'
            },
            {
                label: 'Label 2',
                value: 'label2',
                selected: 'selected'
            }]
        },
        {
            label: 'Multiselect Test',
            prop: 'multiselectTest',
            type: 'multiselect',
            options: [
            {
                label: 'Label 1',
                value: 'label1',
                selected: 'selected'
            },
            {
                label: 'Label 2',
                value: 'label2',
                selected: 'selected'
            },
            {
                label: 'Label 3',
                value: 'label3'
            },
            {
                label: 'Label 4',
                value: 'label4',
                selected: 'selected'
            }]
        },
        {
            label: 'Checkbox Test',
            prop: 'checkboxTest',
            type: 'checkbox',
            default: true
        }],
        action: function(data) {
            console.log('Create a Service data', data);
        }
    }, {
        name: 'No Form',
        action: function() {
            console.log('Run some Node code immediately.');
        }
    }];
}
