class ConferenceDayPlanController < ApplicationController
  def index
    respond_to do |format|
      format.html

      format.jsonapi do
        render json: planned_events_index_response(
            ConferenceDay.preload(planned_events: [:event]).find(params[:conference_day_id]))
      end

      format.all { head :bad_request }
    end
  end

  def create
    respond_to do |format|
      format.jsonapi do
        begin
          ConferenceDay.preload(planned_events: [:event]).find(params[:conference_day_id]).tap do |day|
            day.plan_event(create_planned_event_params)
            day.save!
            head :created
          end
        rescue PlannedEventNotWithinDay
          render json: {
            errors: {
              message: "Validation failed: Planned event not within day boundaries"
            }
          }, status: :unprocessable_entity
        rescue PlannedEventsOverlap
          render json: {
              errors: {
                message: "Validation failed: Event schedule overlaps with previously planned events"
              }
          }, status: :unprocessable_entity
        rescue EventPlannedTwice
          render json: {
              errors: {
                  message: "Validation failed: Event is already planned"
              }
          }, status: :unprocessable_entity
        rescue ActiveRecord::RecordNotFound
          render json: {
            errors: {
              message: "Event or conference day not found"
            }, status: :not_found
          }
        rescue ActiveRecord::RecordInvalid => e
          render_error(e)
        end
      end

      format.all { head :bad_request }
    end
  end

  private
  def create_planned_event_params
    params.require(:planned_event).permit(:id, :start, :event_id)
  end

  def planned_events_index_response(day)
    event_serializer = EventSerializer.new(self, day.conference_id)
    PlannedEventSerializer.new(self,
                               event_serializer,
                               day.conference_id,
                               day.id).serialize_collection(day.planned_events)
  end
end