from cmd import PROMPT
import sys
import replicate
from dotenv import load_dotenv
import os


#loading the dotenv file
load_dotenv()

PROMPT = sys.argv[1]

#Replicate api
REPLICATE_API_TOKEN = os.getenv('REPLICATE_API_TOKEN')


model = replicate.models.get("megvii-research/nafnet")
version = model.versions.get("018241a6c880319404eaa2714b764313e27e11f950a7ff0a7b5b37b27b74dcf7")

inputs = {
    'task_type': "Image Debluring (REDS)",
    'image':open(PROMPT,"rb")
}

output = version.predict(**inputs)
print(output)

