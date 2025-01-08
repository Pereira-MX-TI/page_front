import { SelectOptionNav } from '../models/select_option_nav.model';

export function checkOptionCurrentNav(url: string): SelectOptionNav {
  const selectOption: SelectOptionNav = {
    home: false,
    product: false,
    service: false,
    telemetry: false,
    invoice: false,
    contact: false,
  };

  if (url.includes('Inicio')) selectOption.home = true;
  else if (url.includes('Telemetria')) selectOption.telemetry = true;
  else if (url.includes('Contacto')) selectOption.contact = true;
  return selectOption;
}
