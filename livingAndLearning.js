
/* Primeiro você faz! Só precisa funcionar! */
/* First you do it! Just need to work */
function onInit() {
  console.time('test');
  vm.loading = true;
  funcionarioSVC.getAll({'Config': {'Skip': 0,'Top': 20},'Filter': {}}).then(function(res) {
    vm.items = res;
    getFiliais().then(function() {
      vm.items.map(alteraIdPorAbreviacao);
      funcionarioSVC.getLength().then(function(res) {
        vm.rowCount = res.Linhas;
        rhPartSVC.getAll({'Config': {'Skip': 0,'Top': 20},'Filter': {}}).then(function(res) {
          vm.items = vm.items.map(addRhReconhecerField, res);
          console.log(vm.items);
        }).finally(function() {
          vm.loading = false;
          console.timeEnd('test');
        })
      });
    });
  });
}


/* Depois você faz certo! Você começa a melhorar! */
/* Then do it right! You start to improve!  */
function onInit() {
  var obj = {'Config': {'Skip': 0,'Top': 20},'Filter': {}};
  vm.loading = true;
  funcionarioSVC.getAll(obj)
    .then(function(res) {
      vm.items = res;
      getFiliais()
        .then(function() {
          rhPartSVC.getAll(obj)
            .then(function(res) {
              vm.items = formatFields(vm.items, res);
              vm.loading = false;
            });
        });
    });
  funcionarioSVC.getLength()
    .then(function(res) {
      vm.rowCount = res.Linhas;
    })
}

/* Depois você faz melhor! Mas não pare!!! */
/* Then do it better! But dont stop!!!  */
function onInit(){
  var obj = {'Config': {'Skip': 0,'Top': 20},'Filter': {}};
  vm.loading = true;
  funcionarioSVC.getAll(obj)
    .then(function(res) {
      vm.items = res;
      return getFiliais();
    })
    .then(function(res) {
      return rhPartSVC.getAll(obj);
    })
    .then(function(res) {
      participantes = res;
      vm.items = formatFields(vm.items, participantes);
      return funcionarioSVC.getLength();
    })
    .then(function(res) {
      vm.rowCount = res.Linhas;
      vm.loading = false;
    })
}
