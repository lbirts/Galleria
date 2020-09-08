class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  skip_before_action :logged_in?, only: [:create, :index]
  
  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    @token = encode_token(user_id: @user.id)
    render json: { user: UserSerializer.new(@user), jwt: @token}, status: :created
  end

  # POST /users
  def create
    @user = User.new(user_params)
    byebug
    if @user.save
      @token = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), jwt: @token}, status: :created
    else
      render json: {error: @user.errors}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      @token = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), jwt: @token}, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.permit(:username, :name, :password, :password_confirmation, :bio, :avatar, :email)
    end
end
