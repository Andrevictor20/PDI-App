from inference import InferencePipeline
# Import the built in render_boxes sink for visualizing results
import cv2

def my_sink(result, video_frame):
    if result.get("output_image"): # Display an image from the workflow response
        cv2.namedWindow("Workflow Image", cv2.WINDOW_NORMAL)
        cv2.imshow("Workflow Image", result["output_image"].numpy_image)
        cv2.waitKey(1)
    print(result) # do something with the predictions of each frame
    


# initialize a pipeline object
pipeline = InferencePipeline.init(
    model_id="poluicao-dos-mares/10",
    api_key="qukf1PoiNhMnZCb9AjSO",
    #workspace_name="pdi-zned5",
    #workflow_id="detect-count-and-visualize",
    video_reference=0, # Path to video, device id (int, usually 0 for built in webcams), or RTSP stream url
    max_fps=30,
    on_prediction=my_sink# Function to run after each prediction
)
pipeline.start()
pipeline.join()