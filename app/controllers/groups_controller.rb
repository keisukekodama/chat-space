class GroupsController < ApplicationController

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

   def edit
    @group = Group.find(params[:id]) #これがないと[ArgumentError in Groups#edit]と表示される。
   end


  private
  def group_params
    params.require(:group).permit(:name, :user_ids => [] )#params.require.permitの順で階層になっている。送り手はviewの%input{name: 'group[user_ids][]',type: 'hidden', value: current_user.id}で定義されている。
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
