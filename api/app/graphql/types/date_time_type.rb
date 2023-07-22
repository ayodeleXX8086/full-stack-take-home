module Types
  class DateTimeType < GraphQL::Schema::Scalar
    # This method is used to serialize the datetime value
    def self.coerce_output(value, _context)
      value.utc.iso8601
    end

    # This method is used to parse the input value into a datetime object
    def self.coerce_input(value, _context)
      Time.zone.parse(value)
    end
  end
end
