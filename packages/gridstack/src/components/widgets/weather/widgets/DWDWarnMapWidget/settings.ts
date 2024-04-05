import { string } from 'yup'
import { BaseSelect, SelectOption } from '@lion5/component-library'
import { FormField } from '@/models/formSchema'

export enum DWDWarnGermanyByCriteriaSetting {
  CRITERIA = 'CRITERIA',
  FEDERAL_STATE = 'FEDERAL_STATE'
}

export const DWDWarnGermanyByCriteriaSettingsFormSchema = {
  fields: [
    new FormField(
      BaseSelect,
      'Warnkriterium',
      DWDWarnGermanyByCriteriaSetting.CRITERIA,
      string().nullable(),
      {
        options: [
          new SelectOption(null, 'Alle Warnkriterien'),
          new SelectOption('gewitter', 'Gewitter'),
          new SelectOption('regen', 'Stark- oder Dauerregen'),
          new SelectOption('schnee', 'Schneefall'),
          new SelectOption('sturm', 'Wind / Sturm / Orkan'),
          new SelectOption('nebel', 'Nebel'),
          new SelectOption('frost', 'Frost'),
          new SelectOption('glatteis', 'Glätte, Glatteis'),
          new SelectOption('tauwetter', 'Tauwetter'),
          new SelectOption('hitze', 'Hitze'),
          new SelectOption('uv', 'UV-Strahlung')
        ]
      }
    ),
    new FormField(
      BaseSelect,
      'Bundesland',
      DWDWarnGermanyByCriteriaSetting.FEDERAL_STATE,
      string(),
      {
        options: [
          new SelectOption('de', 'Deutschland'),
          new SelectOption('baw', 'Baden-Württemberg'),
          new SelectOption('bay', 'Bayern'),
          new SelectOption('bbb', 'Berlin, Brandenburg'),
          new SelectOption('hes', 'Hessen'),
          new SelectOption('mvp', 'Mecklenburg-Vorpommer'),
          new SelectOption('nib', 'Niedersachsen, Bremen'),
          new SelectOption('nrw', 'Nordrhein-Westfalen'),
          new SelectOption('rps', 'Rheinland-Pfalz, Saarland'),
          new SelectOption('sac', 'Sachsen'),
          new SelectOption('saa', 'Sachsen-Anhalt'),
          new SelectOption('shh', 'Schleswig-Holstein, Hamburg'),
          new SelectOption('thu', 'Thüringen')
        ]
      }
    )
  ]
}
