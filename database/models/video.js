import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initVideo = (sequelize, Types) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video.init(
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
      },
      group_name: DataTypes.STRING,
      title: DataTypes.STRING,
      thumb: DataTypes.STRING,
      video: DataTypes.STRING,
      video_length: DataTypes.FLOAT,
      is_preview: DataTypes.BOOLEAN,
      is_quiz: DataTypes.BOOLEAN,
      quiz_json: DataTypes.JSON,
      short_id: DataTypes.INTEGER,
      assets_zip: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "userId",
        },
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "courses",
          key: "id",
          as: "courseId",
        },
      },
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Video",
      tableName: "videos",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Video;
};

export default initVideo(connection, DataTypes);
