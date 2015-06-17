class PagesController < ApplicationController
	def index
	end

	def find_location
		p params
		@coords = load_data_with_httparty(params[:lat], params[:lng])
		respond_to do |format|
			format.html { render "index", locals: { coords: @coords } }
		end
	end

	private

	def load_data_with_httparty(lat, lng)
		response = HTTParty.get("https://m.chase.com/PSRWeb/location/list.action?lat=#{lat}&lng=#{lng}")
	end
end