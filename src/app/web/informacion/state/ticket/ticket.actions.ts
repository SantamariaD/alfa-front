import { createAction, props } from '@ngrx/store';
import { Ticket } from '../../interface/ticket';

const GUARDAR_TICKETS = '[Tickets] Guarda los tickets que se atienden';

export const guardarTickets = createAction(
  GUARDAR_TICKETS,
  props<{ tickets: Ticket[] }>()
);
