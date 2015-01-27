module Steps
  class Update < Mutations::Command
    using MongoidRefinements

    required do
      model :step, class: Step
      hash :params do
        optional do
          integer :position
          string :message_type, in: Step::MESSAGE_TYPES
          hash :command do
            model :*, class: Object
          end
        end
      end
    end

    def execute
      # FIXME: Right now, we do almost 0 validation on command objects.
      # There are 7 different command types, with different validation rules.
      # Maybe:
      #    1. Create a StepValidatorFactory
      #    2. Create a SingleCommandValidator, ReadStatusValidator, etc.
      # Or: Use inheritance and embed different classes of Command
      update_attributes(step, params)
    end
  end
end