import { Action, createReducer, on } from '@ngrx/store';
import { TicketInfo } from '../../interface/ticket';
import { guardarTickets } from './ticket.actions';

const estadoInicial: TicketInfo = {} as TicketInfo;

const ticketsReducer = createReducer(
  estadoInicial,
  on(guardarTickets, (state, { tickets }) => {
    return {
      ...state,
      ticketsVenta: tickets,
    };
  })
);

export function reducer(
  state: TicketInfo | undefined,
  action: Action
): TicketInfo {
  return ticketsReducer(state, action);
}
