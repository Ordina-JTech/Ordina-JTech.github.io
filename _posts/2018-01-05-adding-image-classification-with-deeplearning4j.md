---
title: "Adding Image classification with Deeplearning4J to your (Spring Boot) application"
date: 2018-01-05 13:25:00 +0100
categories: programming deeplearning
author: remcorunge

---


## Adding Image classification with Deeplearning4J to your (Spring Boot) application

Deep Learning is a hot topic within Artificial Intelligence. Did you ever wonder how hard it would be to include some deep learning into your own application?

The answer is, not that hard. Within this post I am gone explain how you can use a deep learning network within your own (Spring Boot) application to classify images. Furthermore I will also try to tell you something about the history and theory behind deep learning. 	

In the image below you can see the result. Personally I did not know that the dog in the picture is a Pembroke.


But first I will try to give you some background information.


![ANN](/assets/images/blog/DL-web-app.png)

### A bit of history
Our brain is a very powerful machine which is able to perform a lot off tasks very efficiently while computers struggle at these tasks. Example of these tasks are recognising objects in the world around us, understanding speech and speaking itself. The field of Artificial Intelligence aims to brig this gap and bring the efficiency, learning capabilities and performance of humans to computers. 

In the 1990’s one of the most promising techniques to achieve bridging  was inspired by the biological way in which our brain works. Within our brain, we have billions of interconnected neurons (about 100 billion to be more precise) which are used to process the world around us. By basing computer programs on this structure, Artificial Neural Networks (ANN) where born. Like the human brain an ANN can be trained by feeding it examples. The network is able to change itself in order to recognise the different relevant features of the training data. 

By creating small ANN researchers where able to create programs which where able to, for example, recognise handwriting. Although the technique of ANN seemed promising at the time, it took a lot of time to tweak and train the neural networks in order to achieve a decent performance. 

In the last couple of years the usability of ANN has got a great boost thanks to the research and work of companies such as Google, Microsoft and Facebook. They where able to utilise the parallel computing power of the modern graphic cards for ANN. This made it possible to create large and combined neural networks which could be trained on massive amounts of data. The field of Deep Learning was born. You probably already have experienced the power of deep learning when browsing the internet. For example when you use Google Translate or Google reverse image search. 

 ### A bit of theory

While it is beyond the scope of this post to completely delve into the workings of deep learning, I will try to give a small theoretical introduction. As explained in the previous section, the workings of a ANN are loosely based on the neural networks in our head. Just like our brain acts on input from our senses, an ANN will also act on bases of a certain input.  An ANN is composed of nodes. Within these nodes, the computation takes place. These nodes loosely resemble the neurons in our brains. Just like neurons, the nodes will also fire based when stimuli exceed a certain threshold.

![ANN](/assets/images/blog/DL-ANN1.png)


The first layer of a ANN consist of the input nodes. These nodes are activated by the input of the network. The output of these nodes are fed to the next layer called the ‘hidden layers’. The output of the last hidden layer is then used as input for the final layer of the network, called the ‘output’ layer. 

![ANN2](/assets/images/blog/DL-ANN2.png)


For each node, al the inputs are combined based on a weights for each connection. An activation function (σ(x)) then determines the output of that neuron. By adjusting the weights of the connections the network is able to learn. The learning process of the network is called the training phase. During this phase, the network is presented with a dataset filled with trainingsdata. This trainingsdata consist of the input, as well as the desired output. 

When the trainingsdata is presented, the network will determine its output. By comparing the output of the network to the desired output, the network can adjust its weight to decrease the difference between its output and the desired output. The weights of the network are then changed to decrease the difference. This process is repeated in order to further decrease the difference between output and desired output. 

After the trainings phase, the weights are fixed and a new set of data is presented (the test set). By measuring how well the network performs on this new data, the performance of the network can be determined. 

Deep learning is the process in which multiple large ANN’s (large = lots of hidden layers) are combined. Each of these networks specialise in certain features.  For example, in the first most basic layer, the networks might specialise in recognising vertical lines. In the second layer the ANN’s uses the output of the first layer to recognise, for example noses and eye, while the third layer again combines the output from the second layer to recognise faces. As you can see in the image below.

![Deep Learning](/assets/images/blog/DL-ANN3.png)

[Source](https://deeplearning4j.org/neuralnet-overview)


### Why Deeplearnig4j?

There are a couple of large deep learning frameworks build around Python such as Tensorflow, and Caffe. Since you are reading this at the JTech blog, you probably are more familiar with Java. If that is the case, then Deeplearning4j might be the right framework for you.
Deeplearning4j is an open-source distributed deep-learning library written for java and scala. It can perform its calculations on the CPU as well as the GPU. 

### Spring Boot
If you already have a spring boot (or other type of application) in which you can work with image files then you use it in the following chapter. If not, then you can follow [this tutorial at spring.io](https://spring.io/guides/gs/uploading-files/) to create a Spring boot application in which you can upload image files. 


### Dependencies

Let’s start by adding some dependencies to your pom. The first dependency is the deeplearning4j core.

```xml
<dependency>
	<groupId>org.deeplearning4j</groupId>
	<artifactId>deeplearning4j-core</artifactId>
	<version>0.9.1</version>
</dependency>
```

Secondly we also need to add ND4J which is a scientific computing library for java. This library is used for the necessary array computations which come with deep learning. There are multiple implementations for the nd4j library. You can also use the CUDA variant if you would like to run the network on your GPU instead of your CPU.

```xml
<dependency>
	<groupId>org.nd4j</groupId>
	<artifactId>nd4j-native-platform</artifactId>
	<version>0.9.1</version>
</dependency>

```
Finally we also add the dependency for the model zoo. Within in this zoo a collection of pertained deep learning networks is present.

```xml
<dependency>
	<groupId>org.deeplearning4j</groupId>
	<artifactId>deeplearning4j-zoo</artifactId>
	<version>0.9.1</version>
</dependency>
```
It is important to note that all dependencies have to be of on the same version number. 

### Performing the Deep Learning

Within this section we are gone use an existing deep learning model from the DeepLearning4J model zoo. To be more precise, we are going to use the VGG16 model. This model was created by the Oxford University in 2016. This network has been trained on the Imagenet dataset which contains millions of labelled images divide in 1000 different classes. 

With the following code you can initialise the network:

```java
ComputationGraph vgg16 = (ComputationGraph) new VGG16().initPretrained(PretrainedType.IMAGENET);
```

This gives us the pre-trained imagenet VGG16 network. The initialisation of the network might throw an IOException which we should handle.

Next we need to preprocess the images in order for them to comply with the input format of the network. The network has been trained on images with a height and width of 224 pixels, and 3 colour channels.

```java
NativeImageLoader nativeImageLoader = new NativeImageLoader(224, 224, 3);
```


The combination of the above code gives us the following class:

```java
@Component
public class ImageClassifier {
    private static final int HEIGHT = 224;
    private static final int WIDTH = 224;
    private static final int CHANNELS = 3;
    private ComputationGraph vgg16;
    private NativeImageLoader nativeImageLoader;

    ImageClassifier() {
        try {
            //Setup the VGG16 model from the DL4J ModelZoo
            ZooModel zooModel = new VGG16();
            vgg16 = (ComputationGraph) new VGG16().initPretrained(PretrainedType.IMAGENET);
        } catch (IOException e) {
            e.printStackTrace();
        }
        nativeImageLoader = new NativeImageLoader(HEIGHT, WIDTH, CHANNELS);
    }
}
```

Next we need to write the method which classifies an image. First we can load the image from an image stream (or file) with the previously initialised nativeImageLoader to an INDArray. 

```java
INDArray image = nativeImageLoader.asMatrix(inputStream);
```
Again this might throw an IOException which we should handle.

This gives us the following method:

```java
 private INDArray loadImage(final InputStream inputStream) {
        INDArray image = null;
        try {
            image = nativeImageLoader.asMatrix(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return image;
    }
```

Next we need to normalise the image with the transform method of the VGG16ImagePreProcessor.

```java
private void normalizeImage(final INDArray image) {
        DataNormalization scaler = new VGG16ImagePreProcessor();
        scaler.transform(image);
    }
```

After normalising the image, it is now time to put the Deep Learning network to work with the following code:

```java
    private INDArray processImage(final INDArray image) {
        INDArray[] output = vgg16.output(false, image);
        return output[0];
    }
```

This little piece of code does al the hard work. It uses the image as input, and gives an array of INDArrays as output. Since we only used one image as input, only the first INDArray of the array of INDArrays will be filled.
The first argument of the output method tells the network wether it should use the input image as trainingsdata. We do not need to retrain the network, therefore the boolean is set to false.

The outputs from the network needs to be processed to know which output node had the highest activation. Furthermore we need to know which label (image class) is associated with that node. 

First we make a Prediction object:

```java
public class Prediction {

    private String label;
    private double percentage;

    public Prediction(String label, double percentage) {
        this.label = label;
        this.percentage = percentage;
    }

    public void setLabel(final String label) {
        this.label = label;
    }

    public void setPercentage(final double percentage) {
        this.percentage = percentage;
    }

    public String toString() {
        return String.format("%s: %.2f ", this.label, this.percentage);
    }

}
```

Now we can output a top 5 of predictions with the following code:

```java
private List<Prediction> decodePredictions(INDArray encodedPredictions) {
        List<Prediction> decodedPredictions = new ArrayList<>();
        int[] top5 = new int[5];
        float[] top5Prob = new float[5];

        ArrayList<String> labels = ImageNetLabels.getLabels();
        int i = 0;

        for (INDArray currentBatch = encodedPredictions.getRow(0).dup(); i < 5; ++i) {

            top5[i] = Nd4j.argMax(currentBatch, 1).getInt(0, 0);
            top5Prob[i] = currentBatch.getFloat(0, top5[i]);
            currentBatch.putScalar(0, top5[i], 0.0D);

            decodedPredictions.add(new Prediction(labels.get(top5[i]), (top5Prob[i] * 100.0F)));
        }

        return decodedPredictions;
    }
```

This method returns a nice list of predictions which you can use for your application. In my case, I display the output inside a textblock on a webpage. Therefore I build a String with the labels and scores, separated by line breaks.

```java
private String predictionsToString(List<Prediction> predictions) {
        StringBuilder builder = new StringBuilder();
        for (Prediction prediction : predictions) {
            builder.append(prediction.toString());
            builder.append('\n');
        }
        return builder.toString();
    }
```

Now you are done. The complete class is shown below. You can find the complete code of my Spring Boot Deep Learning Web App in the [JTech repository](https://github.com/Ordina-JTech/deep-learning-webapp). 


```java
package nl.ordina.jtech.deeplearning.imagerecognitionwebapp;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import nl.ordina.jtech.deeplearning.imagerecognitionwebapp.model.Prediction;

import org.datavec.image.loader.NativeImageLoader;
import org.deeplearning4j.nn.graph.ComputationGraph;
import org.deeplearning4j.nn.modelimport.keras.trainedmodels.Utils.ImageNetLabels;
import org.deeplearning4j.zoo.PretrainedType;
import org.deeplearning4j.zoo.ZooModel;
import org.deeplearning4j.zoo.model.VGG16;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dataset.api.preprocessor.DataNormalization;
import org.nd4j.linalg.dataset.api.preprocessor.VGG16ImagePreProcessor;
import org.nd4j.linalg.factory.Nd4j;
import org.springframework.stereotype.Component;

@Component
public class ImageClassifier {
    private static final int HEIGHT = 224;
    private static final int WIDTH = 224;
    private static final int CHANNELS = 3;
    private ComputationGraph vgg16;
    private NativeImageLoader nativeImageLoader;

    ImageClassifier() {
        try {
            ZooModel zooModel = new VGG16();
            vgg16 = (ComputationGraph) new VGG16().initPretrained(PretrainedType.IMAGENET);
        } catch (IOException e) {
            e.printStackTrace();
        }
        nativeImageLoader = new NativeImageLoader(HEIGHT, WIDTH, CHANNELS);
    }

    String classify(InputStream inputStream) {
        INDArray image = loadImage(inputStream);
        normalizeImage(image);
        INDArray output = processImage(image);
        List<Prediction> predictions = decodePredictions(output);
        return predictionsToString(predictions);
    }

    private INDArray processImage(final INDArray image) {
        INDArray[] output = vgg16.output(false, image);
        return output[0];
    }

    private INDArray loadImage(final InputStream inputStream) {
        INDArray image = null;
        try {
            image = nativeImageLoader.asMatrix(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return image;
    }

  
    private void normalizeImage(final INDArray image) {
        DataNormalization scaler = new VGG16ImagePreProcessor();
        scaler.transform(image);
    }

    private List<Prediction> decodePredictions(INDArray encodedPredictions) {
        List<Prediction> decodedPredictions = new ArrayList<>();
        int[] top5 = new int[5];
        float[] top5Prob = new float[5];

        ArrayList<String> labels = ImageNetLabels.getLabels();
        int i = 0;

        for (INDArray currentBatch = encodedPredictions.getRow(0).dup(); i < 5; ++i) {

            top5[i] = Nd4j.argMax(currentBatch, 1).getInt(0, 0);
            top5Prob[i] = currentBatch.getFloat(0, top5[i]);
            currentBatch.putScalar(0, top5[i], 0.0D);

            decodedPredictions.add(new Prediction(labels.get(top5[i]), (top5Prob[i] * 100.0F)));
        }

        return decodedPredictions;
    }

    private String predictionsToString(List<Prediction> predictions) {
        StringBuilder builder = new StringBuilder();
        for (Prediction prediction : predictions) {
            builder.append(prediction.toString());
            builder.append('\n');
        }
        return builder.toString();
    }
}
```
