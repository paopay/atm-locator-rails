Rails.application.routes.draw do
  root 'pages#index'

  post 'find-location', to: 'pages#find_location'

end
