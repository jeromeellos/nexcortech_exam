create database nextcortech_exam

--for new db
--alter table tblMaster drop constraint FK_tblMaster_EnteredBY
--alter table tblMaster drop constraint FK_tblMaster_LastUpdateBY
--alter table tblDetail drop constraint FK_tblDetail_Equipment
--alter table tblDetail drop constraint FK_tblDetail_EnteredBY
--alter table tblDetail drop constraint FK_tblDetail_LastUpdateBY

--drop table tblDetail
--drop table tblMaster
--drop table tblUser

create table tblUser
(
	ID int primary key identity(1,1) not null
	,Email nvarchar(100) not null
	,Name nvarchar(100)
	,Password nvarchar(255) 
	,Active bit not null default 1
	,EnteredBY int 
	,EnteredOn     DateTime2    NOT NULL   
	,LastUpdateBY  int
	,LastUpdateOn   DateTime2 NOT NULL 
)


create table tblMaster
(
	ID INT primary key Identity(1,1) not null
	,EquipmentName  nvarchar(100)  NOT NULL
	,EquipmentLocation nvarchar(100)  NULL
	,Purchased  DateTime2   NULL
	,PurchasePrice    Float   NULL
	,Active  Bit
	,EnteredBY int
	,EnteredOn     DateTime2    NOT NULL   
	,LastUpdateBY       int
	,LastUpdateOn   DateTime2 NOT NULL 
)
GO

ALTER TABLE [dbo].[tblMaster]  WITH CHECK ADD  CONSTRAINT [FK_tblMaster_EnteredBY] FOREIGN KEY([EnteredBY])
REFERENCES [dbo].[tblUser] ([ID])
GO

ALTER TABLE [dbo].[tblMaster]  WITH CHECK ADD  CONSTRAINT [FK_tblMaster_LastUpdateBY] FOREIGN KEY([LastUpdateBY])
REFERENCES [dbo].[tblUser] ([ID])
GO

create table tblDetail
(

	ID INT Identity
	,EquipmentID  INT --fk to tblMaster
	,ActivityDate   DateTime2  NOT NULL
	,Activity     nvarchar(200) NOT NULL
	,ActivityComplete   Bit not null default 0
	,CompletedOn    DateTime2  NULL
	,CompletedBy     nvarchar(100) NULL
	,EnteredBY       int not null
	,EnteredOn     DateTime2    NOT NULL
	,LastUpdateBY      int not null
	,LastUpdateOn   DateTime2 NOT NULL  
)
GO

ALTER TABLE [dbo].[tblDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblDetail_Equipment] FOREIGN KEY([EquipmentID])
REFERENCES [dbo].[tblMaster] ([ID])
GO

ALTER TABLE [dbo].[tblDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblDetail_EnteredBY] FOREIGN KEY([EnteredBY])
REFERENCES [dbo].[tblUser] ([ID])
GO

ALTER TABLE [dbo].[tblDetail]  WITH CHECK ADD  CONSTRAINT [FK_tblDetail_LastUpdateBY] FOREIGN KEY([LastUpdateBY])
REFERENCES [dbo].[tblUser] ([ID])
GO

