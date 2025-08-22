let queue = [];
let completed = [];
let queueVisible = true;

// เพิ่มชื่อเข้า queue
function addName() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (name === "") {
    alert("กรุณากรอกชื่อก่อนเพิ่ม");
    return;
  }

  queue.push(name);
  input.value = "";
  alert("เพิ่มชื่อเข้าคิวแล้ว: " + name);
  updateQueueList();
}

// รันชื่อถัดไป
function runNext() {
  if (queue.length === 0) {
    if (completed.length === 0) {
      document.getElementById("currentName").innerText = "ไม่มีชื่อในคิว 😢";
      return;
    }
    queue = completed.slice();
    completed = [];
  }

  const nextName = queue.shift();
  completed.push(nextName);
  document.getElementById("currentName").innerText = "ถึงคิวคุณ: " + nextName;
  updateQueueList();
}

// รีเซ็ตทั้งหมด
function resetAll() {
  if (!confirm("แน่ใจว่าต้องการรีเซ็ตทั้งหมด?")) return;
  queue = [];
  completed = [];
  document.getElementById("currentName").innerText = "ถึงคิวคุณ: -";
  updateQueueList();
}

// ลบชื่อออกจากคิว
function removeName(index) {
  if (confirm(`ลบ "${queue[index]}" ออกจากคิว?`)) {
    queue.splice(index, 1);
    updateQueueList();
  }
}

// อัปเดตรายชื่อในคิวบนหน้าเว็บ
function updateQueueList() {
  const queueList = document.getElementById("queueList");
  queueList.innerHTML = "";

  queue.forEach((name, index) => {
    const item = document.createElement("div");
    item.className = "queue-item";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `👤 ${name}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.onclick = () => removeName(index);

    item.appendChild(nameSpan);
    item.appendChild(removeBtn);
    queueList.appendChild(item);
  });
}

// ซ่อน/แสดงคิว
function toggleQueue() {
  const queueList = document.getElementById("queueList");
  const toggleBtn = document.querySelector(".toggle-queue-btn button");

  queueVisible = !queueVisible;

  if (queueVisible) {
    queueList.classList.remove("hidden");
    toggleBtn.textContent = "🙈 ซ่อนคิว";
  } else {
    queueList.classList.add("hidden");
    toggleBtn.textContent = "👁 แสดงคิว";
  }
}

// เอฟเฟคเด้งปุ่ม (ตอนคลิก)
function animateButton(btn) {
  btn.style.transition = "transform 0.1s ease";
  btn.style.transform = "scale(1.1)";
  setTimeout(() => {
    btn.style.transform = "scale(1)";
  }, 100);
}

// ติดตั้งเอฟเฟคปุ่มทุกปุ่มหลังโหลด
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      animateButton(button);
    });
  });
});
