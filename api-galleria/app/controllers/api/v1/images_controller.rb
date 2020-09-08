class Api::V1::ImagesController < ApplicationController
  skip_before_action :logged_in?, only: [:index, :show]
  before_action :set_image, only: [:show, :update, :destroy]

  # GET /images
  def index
    @images = Image.all

    render json: @images
  end

  # GET /images/1
  def show
    render json: @image
  end

  # POST /images
  def create
    # byebug
    url = Cloudinary::Uploader.upload(params[:image])
    @image = Image.new(image_params.merge(url: url["secure_url"], key: url["public_id"]))
    
    if @image.save
      render json: @image, status: :created
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /images/1
  def update
    debugger
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  def destroy
    Cloudinary::Uploader.destroy(@image.key)
    @image.destroy
    
  end

  private
    def set_image
      @image = Image.find(params[:id])
    end

    def image_params
      params.permit(:url, :item_id, :key)
    end
end
