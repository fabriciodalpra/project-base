export class ApiResponseMapper {
  private _entity: any;

  constructor(entity: any) {
    this._entity = this.formatToJson(entity);
  }

  private async formatToJson(inputJSON: any) {
    inputJSON = await inputJSON;
    const jsonResult = {};
    try {
      Object.entries(inputJSON).map(async ([key, value]) => {
        if (Array.isArray(value)) {
          let newArray: any = [];
          await Promise.all([
            value.forEach(async (item) => {
              const itemFiltred = await this.formatToJson(item);
              newArray = [...newArray, itemFiltred];
            }),
          ]);
          jsonResult[key] = newArray;
        } else {
          const objectTemp: any = value;
          if (typeof objectTemp === 'object' && objectTemp !== null) {
            if (key == '_id') {
              jsonResult['id'] = objectTemp.value;
            } else if (key == 'props') {
              for (const prop in objectTemp) {
                if (
                  typeof objectTemp[prop] === 'object' &&
                  objectTemp[prop] !== null
                ) {
                  jsonResult[prop] = await this.formatToJson(objectTemp[prop]);
                } else {
                  jsonResult[prop] = objectTemp[prop];
                }
              }
            } else {
              jsonResult[key] = objectTemp;
            }
          } else {
            jsonResult[key] = value;
          }
        }
      });
    } catch (ex) {
      return null;
    }
    return jsonResult;
  }

  toJson() {
    return this._entity;
  }
}
