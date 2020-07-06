import cv2
import numpy as np
import tensorflow as tf

from src.text_recognition import decode


def main(image_path: str, display: bool = False):
    # Reading an image from path
    image = parse_image_from_path(image_path, (640, 640))

    # Detecting text in the picture
    boxes, indices = find_serial_from_banknote(
        "models/text/frozen_east_text_detection.pb", image)

    # Displaying detected bounding boxes
    if display:
        display_serial_boxes(image, indices, boxes)

    # Cropping the best fit serail number from the image
    cropped = crop_serial_number(image, indices, boxes)


def parse_image_from_path(image_path: str, resolution: tuple = None):
    # Loading the image from path
    image = cv2.imread(image_path)

    # Resizing image
    image = cv2.resize(image, dsize=resolution, interpolation=cv2.INTER_CUBIC)

    return image


def find_serial_from_banknote(
        model_path: str,
        image: np.ndarray,
        confidence_threshold: float = 0.99,
        nms_threshold: float = 0.01):

    # Loading the text detection model
    net = cv2.dnn.readNet(model_path)

    # Prepare input image
    blob = cv2.dnn.blobFromImage(
        image, 1.0, image.shape[:2], (123.68, 116.78, 103.94), True, False)

    # Defining output layers containing bbox geometry/confidence
    outputLayers = []
    outputLayers.append("feature_fusion/Conv_7/Sigmoid")
    outputLayers.append("feature_fusion/concat_3")

    # Forward pass input + gather output
    net.setInput(blob)
    output = net.forward(outputLayers)

    # Output processing
    scores = output[0]
    geometry = output[1]

    # Apply NMS
    boxes, confidences = decode(scores, geometry, confidence_threshold)
    indices = cv2.dnn.NMSBoxesRotated(
        boxes, confidences, confidence_threshold, nms_threshold)

    return boxes, indices


def display_serial_boxes(image: np.ndarray, indices: list, boxes: list):
    for i in indices:
        # Get 4 corners of the rotated rect
        vertices = cv2.boxPoints(boxes[i[0]])

        # Adding bounding boxes coordinates to the image
        for j in range(4):
            point_1 = (vertices[j][0], vertices[j][1])
            point_2 = (vertices[(j + 1) % 4][0], vertices[(j + 1) % 4][1])

            cv2.line(image, point_1, point_2, (0, 255, 0), 2, cv2.LINE_AA)

    # Displaying the image
    cv2.imshow('image', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


def crop_serial_number(image: np.ndarray, indices: list, boxes: list):
    max_width = 0.0
    for i in indices:
        # Get 4 corners of the rotated rect
        vertices = cv2.boxPoints(boxes[i[0]])

        # Scale the bounding box coordinates based on the respective ratios
        top_left_x = min([int(coord[0]) for coord in vertices])
        top_left_y = min([int(coord[1]) for coord in vertices])
        bot_right_x = max([int(coord[0]) for coord in vertices])
        bot_right_y = max([int(coord[1]) for coord in vertices])

        # Get the bounding box width and height
        width = abs(abs(vertices[1][0]) - abs(vertices[3][0]))
        height = abs(abs(vertices[0][1]) - abs(vertices[1][1]))

        # Findes the best matching bounding box
        if width > max_width and width > height:
            cropped = image[top_left_y:bot_right_y, top_left_x:bot_right_x]
            max_width = width

    return cropped


if __name__ == "__main__":
    main("./docs/img/banknotes/100euro2.jpg")
