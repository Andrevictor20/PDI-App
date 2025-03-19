# 🌊 Projeto de Detecção de Poluição Marítima

## 📌 Visão Geral
O **Projeto de Detecção de Poluição Marítima** é uma aplicação web inovadora que utiliza **visão computacional** para identificar e detectar objetos poluentes em mares e praias. Com a câmera do dispositivo, o aplicativo reconhece diferentes tipos de lixo em tempo real e fornece informações educativas sobre o impacto ambiental de cada resíduo detectado.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ **Frontend**
- HTML, CSS, JavaScript
- jQuery, AJAX

### 🧠 **IA & Visão Computacional**
- InferenceJS
- Roboflow

### 🌍 **Deploy**
- Raspberry Pi
- Nginx
- Cloudflare Tunnels

---

## 📊 Dataset
📷 **Imagens**: 369 | 🏷 **Anotações**: 411 (média de 1.1 por imagem) | 🏷 **Classes de Objetos**: 8

### 🔎 **Classes de Objetos Poluentes**
- 🧴 **Garrafa plástica** (90 amostras)
- 🍾 **Garrafa de vidro** (66 amostras)
- 🛍️ **Sacola plástica** (55 amostras)
- 🥤 **Copo descartável** (49 amostras)
- 📦 **Papelão** (47 amostras)
- 🛞 **Pneu** (42 amostras)
- 🥫 **Lata de alumínio** (41 amostras)
- 👟 **Calçado** (21 amostras)

---

## 🤖 Modelo de Machine Learning
O modelo de detecção de objetos foi treinado usando **YOLOv11**, alcançando os seguintes resultados:

- 🎯 **mAP (Mean Average Precision)**: **86.5%**
- 🏆 **Precisão**: **87.4%**
- 🔄 **Recall**: **83.9%**
- 📂 **Versão do dataset**: **16**
- 🆔 **ID do modelo**: `poluicao-dos-mares/16`

---

## ✨ Funcionalidades
✅ **Detecção em tempo real** de objetos poluentes através da câmera do dispositivo  
✅ **Bounding boxes coloridas** ao redor dos objetos detectados  
✅ **Nome da classe, quantidade detectada e precisão da detecção**  
✅ **Informações educativas** sobre o impacto ambiental de cada resíduo  
✅ **Interface responsiva** para uso em diferentes dispositivos  

---

## 📂 Estrutura do Projeto
```bash
📂 Projeto
├── 📄 index.html             # Página inicial com instruções
├── 📂 src/
│   ├── 📂 css/
│   │   ├── 🎨 app.css        # Estilos da aplicação
│   │   └── 🎨 apresentacao.css
│   ├── 📂 js/
│   │   └── ⚙️ main.js        # Lógica principal da aplicação
│   └── 📂 pages/
│       └── 📄 app.html       # Página da aplicação de detecção
```

---

## 🛠️ Como Funciona?
1️⃣ **Acesse a página inicial** com instruções sobre o uso.  
2️⃣ **Clique no botão de acesso** para iniciar a detecção.  
3️⃣ **O aplicativo solicita permissão para acessar a câmera** do dispositivo.  
4️⃣ **O modelo de IA é carregado** e inicia a detecção em tempo real.  
5️⃣ **Bounding boxes coloridas** aparecem ao redor dos objetos detectados.  
6️⃣ **São exibidas informações educativas** sobre o impacto ambiental de cada resíduo.  

---

## 🌐 Como Acessar?
O aplicativo está hospedado em um **Raspberry Pi** e pode ser acessado pelo link:  
🔗 [https://pdi.rasppi.site/](https://pdi.rasppi.site/)  

---

## 🔧 Implantação
🖥️ **Servidor**: Raspberry Pi  
🌐 **Servidor Web**: Nginx (Container Docker)  
🔒 **Segurança e Roteamento**: Cloudflare Tunnels  

---

## 🎯 Objetivos Educacionais
O aplicativo visa **conscientizar** os usuários sobre:
- 🏖 **Os diferentes tipos de resíduos** que poluem mares e praias.
- ⏳ **O tempo de decomposição** de cada material.
- 🌎 **O impacto ambiental** de cada tipo de resíduo na fauna e flora marinha.
- 📊 **A quantidade de resíduos descartados** no ambiente marinho brasileiro.

---

## 🤝 Contribuições
💡 **Quer ajudar?** Você pode contribuir com o projeto de diversas formas:
- 📸 **Melhorando o dataset**: adicionando mais imagens e classes de objetos poluentes.
- 🎨 **Aprimorando a interface**: tornando a experiência do usuário mais fluida e intuitiva.
- 🛠 **Desenvolvendo novas funcionalidades**: melhorando a detecção e interatividade.

📩 Entre em contato e faça parte dessa iniciativa!  

---

🌊 **Vamos juntos reduzir a poluição dos oceanos!** 🌱💙

