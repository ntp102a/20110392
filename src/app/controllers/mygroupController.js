const mygroupModel = require('../models/mygroupModels')
const http = require('http');
const url = require('url');

module.exports = {
//Get All List 
getAll : function (req,res) {

  // Display GET / POST, url
  const protocol = req.method;
  const url = req.originalUrl;

  console.log(`Protocol: ${protocol}`);
  console.log(`URL: ${url}`);

    res.json(mygroupModel.mygroup)
},
//Get by MSSV 
getByMSSV: function (req, res) {
    // const path = parsedUrl.pathname;
    const { slug } = req.params;
  
    // Tìm thông tin sinh viên dựa trên slug
    const student = mygroupModel.mygroup.find((item) => item.id === slug);
  
    if (!student) {
      return res.send('Not found');
    }
  
    // Display GET / POST, url
    const protocol = req.method;
    const url = req.originalUrl;

    console.log(`Protocol: ${protocol}`);
    console.log(`URL: ${url}`);

    // Trả về tên của sinh viên
    res.send(`Name: ${student.name}`);
  },
//Get by Message/:id
  getMessageById: function (req, res) {
        const id = req.params.mssv; // Lấy giá trị id từ đường dẫn URL

        // Nếu có id, tìm sinh viên có id tương ứng
        const student = mygroupModel.mygroup.find((student) => student.id === id);
        console.log(student)
        if (student) {
            // Trả về tên của sinh viên dưới dạng HTML
            const studentHTML = `
            <html>
            <body>
                <h1>Thông tin sinh viên</h1>
                <p>ID: ${student.id}</p>
                <p>Tên: ${student.name}</p>
            </body>
            </html>
            `;
            res.send(studentHTML);
        }else{
            // Nếu không tìm thấy sinh viên, trả về "Not found"
            return res.send('Not found1');
        }
        
    // Display GET / POST, url
    const protocol = req.method;
    const url = req.originalUrl;

    console.log(`Protocol: ${protocol}`);
    console.log(`URL: ${url}`);
  },
//Get by /message
getMessage: function (req, res) {
    // Lấy danh sách tất cả sinh viên
    const studentList = mygroupModel.mygroup;
    
    // Tạo danh sách sinh viên dưới dạng HTML
    const studentListHTML = `
      <html>
        <body>
          <h1>Danh sách sinh viên</h1>
          <ul>
            ${studentList.map((student) => `<li>${student.name}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;
  
    // Display GET / POST, url
    const protocol = req.method;
    const url = req.originalUrl;

    console.log(`Protocol: ${protocol}`);
    console.log(`URL: http://localhost:5000/${url}`);

    // Trả về danh sách sinh viên dưới dạng HTML
    res.send(studentListHTML);
  },
  addStudent: function(req,res) {
        const data = req.body;
    if (data && data.id && data.name) {
        // Thêm dữ liệu vào models (ví dụ: mygroupModel)
        mygroupModel.mygroup.push({ id: data.id, name: data.name });
        res.send('Data added successfully');
    } else {
        res.status(400).send('Invalid data');
    }
    // Display GET / POST, url
    const protocol = req.method;
    const url = req.originalUrl;

    console.log(`Protocol: ${protocol}`);
    console.log(`URL: http://localhost:5000/${url}`);
  },
  test: function (req, res) {
    const data = req.body.id;
    if(data)
    {
      res.send(data);
    }
    else{
      res.send("Error");
    }
  }
}