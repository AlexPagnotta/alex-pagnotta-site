import { parse } from 'date-fns'

export const parseMarkdownDate = (date: string) =>
  parse(date, 'dd/MM/yyyy', new Date())
