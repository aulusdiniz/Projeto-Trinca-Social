 	enchant();
window.onload = function() {	
    var game = new Game(window.screen.availWidth, window.screen.availHeight);
	//Escalas
	var sprite_scale = 3/5;
	var sprite_width = 176;
	var sprite_height = 274;
	var spacing_hor = 10;
	var spacing_ver = -sprite_width/3;
	var desl_hor = 200;
	var desl_ver = 100;
	
		//carrega as imagens necessárias na hora que o jogo liga, disponibiliza em game.assets(['../imgs/cards/s001.png']);
    	game.preload(
			'../imgs/cards/s001.png',
			'../imgs/cards/s002.png',
			'../imgs/cards/s003.png',
			'../imgs/cards/slot.png',
			'../imgs/cards/deck.png'
			);
		
		//fundo verde, igual ao html;	
		game.rootScene.backgroundColor = '#0d591d';

	//Baralho, atualiza os slots do holder
    var Deck = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y, holder, hand, cards) {
            enchant.Sprite.call(this, sprite_width, sprite_height);
            this.x = x;
            this.y = y;
			this.scale(sprite_scale,sprite_scale);
            this.image = game.assets['../imgs/cards/deck.png'];
			this.availCards = cards;
			this.usedCards = [];
			this.giveCard = function(target){
				
				if(Dealer.tradeOne!=null){
					Dealer.unselectCard(Dealer.tradeOne);
					Dealer.tradeOne = null;
					Dealer.tradeOp = 0;
					}
				if(this.availCards.length>0){
					var rand = Math.floor(Math.random()*this.availCards.length);
					target.updateSlots(this.availCards[rand]);
					this.usedCards.push(this.availCards.slice(rand));
					this.availCards.splice(rand,1);
					if(this.availCards.length<1){
						this.image = game.assets['../imgs/cards/slot.png'];
						}
				}
				}
			this.giveCardToSlot = function(target){//preenche o espaço que sobra ao trocar as cartas.
				if(this.availCards.length>0){
					var rand = Math.floor(Math.random()*this.availCards.length);
					target.image = this.availCards[rand];
					target.isEmpty = false;
					this.usedCards.push(this.availCards.slice(rand));
					this.availCards.splice(rand,1);
					if(this.availCards.length<1){
						this.image = game.assets['../imgs/cards/slot.png'];
						}
				}
				}	
			this.giveHand = function(){
					for(var i=0; i<6; i++){
						this.giveCard(hand);
					}
				}
			this.addEventListener('touchend', function(){	
				this.giveCard(holder);
            });
            game.rootScene.addChild(this);
        }
    });
	
//==============================================================================Slots para cartas==========//	
	var Slot = enchant.Class.create(enchant.Sprite, {
		initialize: function(x, y){
			enchant.Sprite.call(this, sprite_width, sprite_height);
			this.x = x;
			this.y = y;
			this.isEmpty = true;
			this.updateImage = function(asset){
				this.image = asset;
				}
			this.getImage = function(){
				return this.image;
				}	
			this.scale(sprite_scale,sprite_scale);
			this.image = game.assets['../imgs/cards/slot.png'];
			game.rootScene.addChild(this);
			}
		});
		
	var Slot_holder = enchant.Class.create(Slot, {
		initialize: function(x, y){
			Slot.call(this, sprite_width, sprite_height);
			this.x = x;
			this.y = y;
			//seleção de carta.	
			this.addEventListener('touchend', function(){	
				Dealer.trade(this);
            });
			game.rootScene.addChild(this);
			}
		});
		
		var Slot_hand = enchant.Class.create(Slot, {
		initialize: function(x, y){
			Slot.call(this, sprite_width, sprite_height);
			this.x = x;
			this.y = y;
			//seleção de carta.
			this.addEventListener('touchend', function(){	
				Dealer.trade(this);
            });
			game.rootScene.addChild(this);
			}
		});
		
		var Slot_trinca = enchant.Class.create(Slot, {
		initialize: function(x, y){
			Slot.call(this, sprite_width, sprite_height);
			this.x = x;
			this.y = y;
			//seleção de carta.
			this.addEventListener('touchend', function(){	
					Dealer.trade(this);
            });
			game.rootScene.addChild(this);
			}
		});
//============================================================================================================//		
	
	//Troca de cartas e interação do usuário com o jogo.
	var Dealer = enchant.Class.create({
		initialize: function(deck, trinca){
				Dealer.tradeOne = null;
				Dealer.tradeTwo = null;
				Dealer.tradeOp = 0;
				Dealer.unselectCard = function(obj){
					//view: unselect card
					obj.y += (sprite_height*sprite_scale + spacing_ver)*0.2;
				}
				Dealer.trade = function(obj){
					if(obj != Dealer.tradeOne && obj.y >= desl_ver){
						//if(Dealer.tradeOne == null)
						
						//view: select card
						obj.y -= (sprite_height*sprite_scale + spacing_ver)*0.2;
					switch(Dealer.tradeOp){
						case 0:{
							Dealer.tradeOne = obj;
							Dealer.tradeOp++;
							break;
							}
						case 1:{
							if(obj.y != Dealer.tradeOne.y){
								var tempObj = obj.image;
								Dealer.tradeTwo = obj;
								Dealer.tradeTwo.updateImage(Dealer.tradeOne.image);
								Dealer.tradeOne.updateImage(tempObj);
								var tempBool = Dealer.tradeOne.isEmpty;
								Dealer.tradeOne.isEmpty = Dealer.tradeTwo.isEmpty;
								Dealer.tradeTwo.isEmpty = tempBool;
								if(Dealer.tradeOne.isEmpty==true)
									deck.giveCardToSlot(Dealer.tradeOne); 
								if(Dealer.tradeTwo.isEmpty==true)
									deck.giveCardToSlot(Dealer.tradeTwo);

								Dealer.unselectCard(Dealer.tradeOne);
								Dealer.unselectCard(Dealer.tradeTwo);
								Dealer.tradeOne = null;
								Dealer.tradeTwo = null;
								Dealer.tradeOp = 0;
								}
							else{
								Dealer.unselectCard(Dealer.tradeOne);
								Dealer.tradeOne = obj;		
								Dealer.tradeOp = 1;
								}
							break;
							}
						default:{
							//nothing;
							}	
						}
					}
					else{
						if(obj == Dealer.tradeOne && Dealer.tradeOne.isEmpty){
							Dealer.unselectCard(Dealer.tradeOne);
							Dealer.tradeOne = null;
							Dealer.tradeOp = 0;
						}
					}
				}
				if(trinca.checkEndgame()){
					alert("Você já pode publicar uma trinca!");
					}
			}
		});
//=================================================================Containers para Slots===============//		
	var Holder = enchant.Class.create({
		initialize: function(slots){
				this.slots = slots;
				this.fixZorder = function(){
					for(i=0;i<12;i++){
						game.rootScene.removeChild(this.slots[11-i]);
						game.rootScene.addChild(this.slots[11-i]);
					}
				}
				this.updateSlots = function(asset){
						for(i=this.slots.length-1; i>-1;i--){
							if(i>0){
								this.slots[i].updateImage(this.slots[i-1].image);
								this.slots[i].isEmpty = false;
								}
								else{
									this.slots[i].updateImage(asset);
									this.slots[i].isEmpty = false;
									}
						}
				}
			}
		});
		
	var Hand = enchant.Class.create({
		initialize: function(slots){
				this.slots = slots;
				this.updateSlots = function(asset){
						for(i=this.slots.length-1; i>-1;i--){
							if(i>0){
								this.slots[i].updateImage(this.slots[i-1].image);
								this.slots[i].isEmpty = false;
								}
								else{
									this.slots[i].updateImage(asset);
									this.slots[i].isEmpty = false;
									}
							}
					}
			}
		});

	var Trinca = enchant.Class.create({
		initialize: function(slots){
				this.slots = slots;
				this.checkEndgame = function(){
					for(var i=0; i<this.slots.length;i++){
						if(this.slots[i].isEmpty){
							return false;
						}
						}
						return true;
					}
			}
		});
//=====================================================================================================//
	//Criador de Slots
	var createSlots = function(nline, ncols, row, op){
		var content = [];
		var pos = 2;
	
		for(i=0;i<ncols*nline;i++){				
				if(pos>7){
					pos = 2;
					row++;
				}
				switch(op){
					case 0:{
						content.push(new Slot_trinca(desl_hor+pos*(sprite_width+spacing_hor)*sprite_scale,desl_ver+row*spacing_ver));
						break;
					}
					case 1:{
						content.push(new Slot_hand(desl_hor+pos*(sprite_width+spacing_hor)*sprite_scale,desl_ver+row*spacing_ver));
						break;
					}
					case 2:{
						content.push(new Slot_holder(desl_hor+pos*(sprite_width+spacing_hor)*sprite_scale,desl_ver+row*spacing_ver))
						break;
					}
				}
				pos++;
			}
			return content;
		}
		
    game.onload = function() {

			  //cartas disponíveis para jogar.
   			  var cards = [
					game.assets['../imgs/cards/s001.png'],
					game.assets['../imgs/cards/s002.png'],
					game.assets['../imgs/cards/s003.png'],
					game.assets['../imgs/cards/s001.png'],
					game.assets['../imgs/cards/s002.png'],
					game.assets['../imgs/cards/s003.png'],
					game.assets['../imgs/cards/s001.png'],
					game.assets['../imgs/cards/s002.png'],
					game.assets['../imgs/cards/s003.png'],
					game.assets['../imgs/cards/s001.png'],
					game.assets['../imgs/cards/s002.png'],
					game.assets['../imgs/cards/s003.png'],
					game.assets['../imgs/cards/s001.png'],
					game.assets['../imgs/cards/s002.png'],
					game.assets['../imgs/cards/s003.png'],
					game.assets['../imgs/cards/s001.png'],
					game.assets['../imgs/cards/s002.png'],
					game.assets['../imgs/cards/s003.png'],
					game.assets['../imgs/cards/s001.png'],
					game.assets['../imgs/cards/s002.png'],
					game.assets['../imgs/cards/s003.png'],
					game.assets['../imgs/cards/s001.png'],
					game.assets['../imgs/cards/s002.png'],
					game.assets['../imgs/cards/s003.png'] 
			  ];

		//esta ordem precisa ser conservada.
		//os argumentos de createSlots se refere a linha que a carta será posicionada e o tipo de slot;
		var holder = new Holder(createSlots(3,6,0,2));
			holder.fixZorder();
		var hand   = new Hand(createSlots(1,6,-3,1));
		var deck   = new Deck(desl_hor,desl_ver+spacing_ver, holder, hand, cards);
			deck.giveHand();
		var trinca = new Trinca(createSlots(1,3,-6, 0));
		var dealer = new Dealer(deck, trinca);
		for(var i=0;i<6;i++){	
			deck.giveCard(holder);
		}
    };
    game.start();
};