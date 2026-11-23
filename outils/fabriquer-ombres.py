# Fabrique img/ombres/*.webp (silhouettes du jeu Ombres) depuis img/pictos. Usage : python3 outils/fabriquer-ombres.py img/pictos img/ombres
import sys,glob,os,json
from PIL import Image, ImageFilter, ImageChops
import numpy as np
from scipy import ndimage
src,dst=sys.argv[1],sys.argv[2]; os.makedirs(dst,exist_ok=True)
ok=[];ko=[]
for f in sorted(glob.glob(src+'/*.webp')):
    im=Image.open(f).convert('RGBA'); a=np.array(im).astype(int)
    rgb=a[...,:3]; al=a[...,3]
    blanc=(rgb.min(axis=2)>232)&((rgb.max(axis=2)-rgb.min(axis=2))<22) | (al<40)
    lab,n=ndimage.label(blanc)
    bord=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    fond=np.isin(lab,list(bord))
    obj=~fond
    obj=ndimage.binary_closing(obj,iterations=2)
    obj=ndimage.binary_fill_holes(obj)
    # garder les morceaux significatifs
    lab2,n2=ndimage.label(obj); 
    if n2:
        s=ndimage.sum(obj,lab2,range(1,n2+1)); keep=[i+1 for i,v in enumerate(s) if v>obj.size*0.002]
        obj=np.isin(lab2,keep)
    part=obj.mean(); bordobj=np.concatenate([obj[0],obj[-1],obj[:,0],obj[:,-1]]).mean()
    code=os.path.basename(f)[:-5]
    if part<0.04 or part>0.80 or bordobj>0.45: ko.append((code,round(part,2),round(bordobj,2))); continue
    out=np.zeros(obj.shape+(4,),np.uint8); out[obj]=(20,14,48,255)
    m=Image.fromarray(out,'RGBA')
    # bord adouci
    al2=Image.fromarray((obj*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)); m.putalpha(al2)
    m.save(dst+'/'+code+'.webp','WEBP',quality=80,method=6); ok.append(code)

print(len(ok),'ko',ko)
