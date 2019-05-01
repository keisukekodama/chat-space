class UsersController < ApplicationController

  def new
  end


  def index
     @indexs = User.where("name LIKE(?) AND (id != ?)","%#{params[:keyword]}%", current_user.id).limit(20)
    #あいまい検索と現在のログインユーザーを弾いている。
    # User.where("name LIKE(?)","%#{params[:keyword]}%").not(current_user).limit(20)
    respond_to do |format|
     format.json
  end
  end


  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def repository
    client.repository　full_name
  end


  def user_params
    params.require(:user).permit(:name, :email)
  end
end
