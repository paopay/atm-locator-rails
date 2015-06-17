class PagesController < ApplicationController
	def index
	end

	def find_location
		@data = {}
		@data = load_data_with_httparty(params[:lat], params[:lng])
		render json: @data
	end

	private

	# queries chase atm locator api with params coming
	# from the client. saves data along with lat & lng
	# to be passed back to client.
	def load_data_with_httparty(lat, lng)
		data = {}
		data[:atm_locations] = HTTParty.get("https://m.chase.com/PSRWeb/location/list.action?lat=#{lat}&lng=#{lng}")
		data[:lat] = lat
		data[:lng] = lng
		data
	end
end