class Api::V1::AuthController < ApplicationController
    skip_before_action :logged_in?

    def create
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            token = encode_token({user_id: @user.id})
            render json: { user: UserSerializer.new(@user), jwt: token}, status: :accepted
        else
            render json: {error: "Incorrect"}, status: :unprocessable_entity
        end
    end
end
