class PagesController < ApplicationController
	def index
		@json_response = load_data_with_httparty
	end

	private

	def load_data_with_httparty
		response = HTTParty.get('https://m.chase.com/PSRWeb/location/list.action?lat=37.751370699999995&lng=-122.42121939999998')
	end
end