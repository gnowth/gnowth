interface Dependencies {
  serviceSplitGroup: ''
  serviceTranslation: ''
}

interface Props {
  formId: string
  dataId?: string
}

interface OptionsInterfaceFormSplitGroup {
  dependencies: Dependencies
  props: Props
}

export class InterfaceFormSplitGroup implements InterfaceForm {
  dependencies: Dependencies
  options: OptionsInterfaceFormSplitGroup
  props: Props

  constructor(options: OptionsInterfaceFormSplitGroup) {
    this.dependencies = options.dependencies
    this.options = options
    this.props = options.props
  }

  getProps() {
    return {
      ...this.props,
      service: this.dependencies.serviceSplitGroup,
    }
  }

  render() {
    return [
      { id: `${this.props.formId}-title`, name: 'title' },
      { id: `${this.props.formId}-description`, name: 'description' },
      { id: `${this.props.formId}-categories`, name: 'categories' },
      { id: `${this.props.formId}-participants`, name: 'participants' },
      {
        $type: 'FormAction',
        children: this.dependencies.serviceTranslation.translate(this.props.dataId ? 'Create' : 'Save'),
        eventName: 'save',
        id: `${this.props.formId}-action-save`,
      },
      {
        $type: 'FormAction',
        children: this.dependencies.serviceTranslation.translate('Archive'),
        eventName: 'archive',
        hidden: !this.props.dataId,
        id: `${this.props.formId}-action-archive`,
      },
      {
        $type: 'FormAction',
        children: this.dependencies.serviceTranslation.translate('Delete'),
        eventName: 'delete',
        hidden: !this.props.dataId,
        id: `${this.props.formId}-action-delete`,
      },
    ]
  }
}
