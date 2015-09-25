var monoscope = require('../monoscope');
monoscope.run(getShortcuts(), {
    title: 'Components Example'
});

function getShortcuts() {
    return [
    {
        name: 'Create a Module',
        form: [
        {
            label: 'Module Name',
            type: 'text',
            default: 'newModule'
        },
        {
            label: 'Include a Directive?',
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
            type: 'text',
            default: 'myService'
        },
        {
            label: 'Select Test',
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
            }]
        },
        {
            label: 'Checkbox Test',
            type: 'checkbox',
            default: true
        }],
        action: function(data) {
            console.log('Create a Service data', data);
        }
    }];
}
