const defaultKeys = [
    'active',
    'databaseId',
    'html',
    'id',
    'idBase',
    'title',
    'type',
] as const;

type DefaultData = Partial<{
    [key in typeof defaultKeys[number]]: string
}> & { __typename: string; };

type DataType = DefaultData & {
    [key: string]: any;
};

export type WidgetFactoryProps = {
    data: DataType;
    comps: { [type: string]: (data: DataType) => JSX.Element };
    defaultComponent?: (data: DefaultData) => JSX.Element;
};

const WidgetFactory = ({ data, comps, defaultComponent }: WidgetFactoryProps): JSX.Element => {
    // eslint-disable-next-line no-underscore-dangle
    const type = data.__typename;
  
    if (Object.prototype.hasOwnProperty.call(comps, type)) return comps[type](data);
  
    if (defaultComponent) {
      const defaultData = {};
  
      Object.entries(data).forEach(([key, ele]) => {
        // @ts-ignore
        if (defaultKeys.find(key)) defaultData[key] = ele;
      });
  
      // @ts-ignore
      return defaultComponent(defaultData);
    }
  
    return null;
};

export default WidgetFactory;