import Taro from "@tarojs/taro";

export const uploadImage = async (paths: string[]) => {
  try {
    const uploadPromise = paths.map((path) => {
      Taro.uploadFile({
        url: "uploadPath",
        filePath: path,
        name: "file",
      });
    });
    const uploadResults = await Promise.all(uploadPromise);
    const imageUrls = uploadResults.map((res: any) => {
      if (res.statusCode === 200) {
        const { data } = JSON.parse(res.data);
        return data.imageUrl;
      } else {
        throw new Error("上传失败");
      }
    });
    return imageUrls;
  } catch (err) {
    throw new Error("上传图片发生错误");
  }
};
