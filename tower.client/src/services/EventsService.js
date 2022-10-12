import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js"
import { Event } from '../models/Event.js';
import { Comment } from "../models/Comment.js";

class EventsSerivce {
  async getEvents(query) {
    console.log(query)
    const res = await api.get(`/api/events`)
    AppState.events = res.data.map(e => new Event(e))

    if (query) {
      AppState.events = AppState.events.filter(e => e.type == query)
    }

  }

  async getEventById(eventId) {
    const res = await api.get(`/api/events/${eventId}`)
    AppState.activeEvent = new Event(res.data)

  }

  async getEventComments(eventId) {
    const res = await api.get(`/api/events/${eventId}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
  }

  async createComment(body, eventId) {
    const res = await api.post('/api/comments/', { body: body, eventId: eventId })
    AppState.comments = [new Comment(res.data), ...AppState.comments]
  }

  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }

  async createEvent(eventData) {
    const res = await api.post('/api/events', eventData)
    const event = new Event(res.data)
    AppState.events = [event, ...AppState.events]
    return event
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    AppState.activeEvent.isCanceled = true;
  }
}

export const eventsService = new EventsSerivce()