export class TimelineEvent {
  constructor(
    /**
     * Time of the event
     */
    readonly dateTime: Date | undefined,
    /**
     * Title of the event
     */
    readonly title: string,
    /**
     * Additional info
     */
    readonly description?: string,
    /**
     * Bootstrap icon class
     */
    readonly iconCls: string = 'bi-check2-circle',
    /**
     * If item already executed or not
     */
    readonly active: boolean = true,
    /**
     * A slot to customize rendering of different parts
     *
     * #{{ event.slot }}-marker
     * #{{ event.slot }}-dateTime
     * #{{ event.slot }}-title
     * #{{ event.slot }}-description
     */
    readonly slot?: string
  ) {
  }
}