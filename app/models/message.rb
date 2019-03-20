class Message < ApplicationRecord
belongs_to :user
belongs_to :group


validates :content, presence: true, unless: :image?
mount_uploader :image, ImageUploader #テストのときはこれはいらない。CarrierWaveを使うために必要。
end
